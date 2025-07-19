// React Query provider setup for data fetching

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNetInfo } from "@react-native-community/netinfo";
import { focusManager } from "@tanstack/react-query";
import { AppState, Platform } from "react-native";
import { env } from "../config/env";

// Handle app state changes for query client
function onAppStateChange(status: string) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

// Create query client with optimized settings
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Stale time - how long data is considered fresh
        staleTime: 1000 * 60 * 5, // 5 minutes

        // Garbage collection time - how long to keep unused data in cache
        gcTime: 1000 * 60 * 10, // 10 minutes

        // Retry failed requests
        retry: (failureCount, error) => {
          // Don't retry on 4xx errors (client errors)
          if (error && typeof error === "object" && "status" in error) {
            const status = (error as any).status;
            if (status >= 400 && status < 500) {
              return false;
            }
          }

          // Retry up to 3 times for other errors
          return failureCount < 3;
        },

        // Retry delay with exponential backoff
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

        // Refetch on window focus (when app becomes active)
        refetchOnWindowFocus: true,

        // Refetch on reconnect
        refetchOnReconnect: true,

        // Background refetch interval
        refetchInterval: false, // Disable automatic background refetching

        // Network mode
        networkMode: "online",
      },

      mutations: {
        // Retry failed mutations
        retry: 1,

        // Network mode for mutations
        networkMode: "online",
      },
    },
  });
};

interface QueryProviderProps {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  // Network status monitoring
  const netInfo = useNetInfo();

  // Create query client instance
  const [queryClient] = React.useState(() => createQueryClient());

  // Handle app state changes
  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription?.remove();
  }, []);

  // Handle network status changes
  React.useEffect(() => {
    // Update React Query's online status based on network connectivity
    focusManager.setFocused(netInfo.isConnected ?? true);
  }, [netInfo.isConnected]);

  // Global error handler for queries
  React.useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event?.type === "error") {
        const error = event.error;

        // Log errors in development
        if (env.IS_DEV) {
          console.error("Query Error:", error);
        }

        // Handle specific error types
        if (error && typeof error === "object" && "status" in error) {
          const status = (error as any).status;

          // Handle authentication errors
          if (status === 401) {
            // Redirect to login or refresh token
            queryClient.clear();
          }

          // Handle server errors
          if (status >= 500) {
            // Show server error message
            console.error("Server error occurred");
          }
        }
      }
    });

    return unsubscribe;
  }, [queryClient]);

  // Global mutation error handler
  React.useEffect(() => {
    const unsubscribe = queryClient.getMutationCache().subscribe((event) => {
      if (event?.type === "error") {
        const error = event.error;

        // Log mutation errors in development
        if (env.IS_DEV) {
          console.error("Mutation Error:", error);
        }
      }
    });

    return unsubscribe;
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

// Custom hook for accessing query client
export const useQueryClient = () => {
  const client = QueryClient;
  if (!client) {
    throw new Error("useQueryClient must be used within QueryProvider");
  }
  return client;
};

// Helper function to prefetch queries
export const prefetchQuery = async (
  queryClient: QueryClient,
  queryKey: any[],
  queryFn: () => Promise<any>,
  options?: any,
) => {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    ...options,
  });
};

// Helper function to invalidate queries
export const invalidateQueries = (
  queryClient: QueryClient,
  queryKey: any[],
) => {
  queryClient.invalidateQueries({ queryKey });
};

// Helper function to clear all queries
export const clearAllQueries = (queryClient: QueryClient) => {
  queryClient.clear();
};

// Optimistic update helper
export const optimisticUpdate = <T,>(
  queryClient: QueryClient,
  queryKey: any[],
  updater: (oldData: T | undefined) => T,
) => {
  queryClient.setQueryData<T>(queryKey, updater);
};

// Error boundary for query errors
export class QueryErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error: Error }>;
  },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Query Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback;
      if (FallbackComponent && this.state.error) {
        return <FallbackComponent error={this.state.error} />;
      }

      // Default error UI
      return null; // You would implement a proper error UI here
    }

    return this.props.children;
  }
}

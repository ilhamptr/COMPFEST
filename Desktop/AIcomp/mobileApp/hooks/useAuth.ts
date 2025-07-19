// React hooks for authentication and user management

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../services/authService";
import { useAuthStore } from "../store";
import { LoginCredentials, RegisterCredentials, User } from "../types/user";

// Hook for authentication state
export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setAuthenticated,
    setLoading,
    setError,
    logout: logoutStore,
  } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setAuthenticated,
    setLoading,
    setError,
    logout: logoutStore,
  };
};

// Hook for login mutation
export const useLogin = () => {
  const { setUser, setAuthenticated, setError } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      AuthService.login(credentials),
    onSuccess: ({ user, token }) => {
      setUser(user);
      setAuthenticated(true);
      setError(null);

      // Invalidate and refetch user-specific data
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["recipes", "favorites"] });
      queryClient.invalidateQueries({
        queryKey: ["recipes", "recommendations"],
      });
    },
    onError: (error: Error) => {
      setError(error.message);
      setAuthenticated(false);
    },
  });
};

// Hook for registration mutation
export const useRegister = () => {
  const { setUser, setAuthenticated, setError } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) =>
      AuthService.register(credentials),
    onSuccess: ({ user, token }) => {
      setUser(user);
      setAuthenticated(true);
      setError(null);

      // Invalidate queries for fresh start
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
};

// Hook for logout mutation
export const useLogout = () => {
  const { logout: logoutStore } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      logoutStore();

      // Clear all cached data
      queryClient.clear();
    },
    onError: (error: Error) => {
      // Even if server logout fails, logout locally
      logoutStore();
      queryClient.clear();
    },
  });
};

// Hook for updating user profile
export const useUpdateProfile = () => {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<User>) => AuthService.updateProfile(updates),
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.setQueryData(["user", "profile"], updatedUser);
    },
  });
};

// Hook for changing password
export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => AuthService.changePassword(currentPassword, newPassword),
  });
};

// Hook for password reset request
export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) => AuthService.requestPasswordReset(email),
  });
};

// Hook for password reset
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({
      token,
      newPassword,
    }: {
      token: string;
      newPassword: string;
    }) => AuthService.resetPassword(token, newPassword),
  });
};

// Hook for email verification
export const useVerifyEmail = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: (token: string) => AuthService.verifyEmail(token),
    onSuccess: () => {
      // Refetch user data to update verification status
      // This would typically update the user object
    },
  });
};

// Hook for resending email verification
export const useResendEmailVerification = () => {
  return useMutation({
    mutationFn: AuthService.resendEmailVerification,
  });
};

// Hook for account deletion
export const useDeleteAccount = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (password: string) => AuthService.deleteAccount(password),
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
  });
};

// Hook for user preferences
export const useUserPreferences = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["user", "preferences", user?.id],
    queryFn: AuthService.getUserPreferences,
    enabled: !!user,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for updating user preferences
export const useUpdateUserPreferences = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: AuthService.updateUserPreferences,
    onSuccess: (updatedPreferences) => {
      queryClient.setQueryData(
        ["user", "preferences", user?.id],
        updatedPreferences,
      );

      // Invalidate recommendations as they depend on preferences
      queryClient.invalidateQueries({
        queryKey: ["recipes", "recommendations"],
      });
    },
  });
};

// Hook for social login
export const useSocialLogin = () => {
  const { setUser, setAuthenticated, setError } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ provider, token }: { provider: string; token: string }) =>
      AuthService.socialLogin(provider, token),
    onSuccess: ({ user, token }) => {
      setUser(user);
      setAuthenticated(true);
      setError(null);

      // Invalidate and refetch user-specific data
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["recipes", "favorites"] });
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
};

// Hook for initializing authentication state on app start
export const useInitializeAuth = () => {
  const { setUser, setAuthenticated, setLoading } = useAuthStore();

  return useQuery({
    queryKey: ["auth", "initialize"],
    queryFn: async () => {
      setLoading(true);
      try {
        const result = await AuthService.initializeAuth();
        setUser(result.user);
        setAuthenticated(result.isAuthenticated);
        return result;
      } finally {
        setLoading(false);
      }
    },
    staleTime: Infinity, // Only run once
    gcTime: Infinity, // Never garbage collect
  });
};

// Hook for checking if user is authenticated
export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated;
};

// Hook for getting current user
export const useCurrentUser = () => {
  const { user } = useAuthStore();
  return user;
};

// Hook for token refresh (usually used internally)
export const useRefreshToken = () => {
  const { setUser, setAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: (refreshToken: string) =>
      AuthService.refreshToken(refreshToken),
    onSuccess: ({ token }) => {
      // Token is automatically stored by AuthService
      // Just ensure authentication state is maintained
      setAuthenticated(true);
    },
    onError: () => {
      // If refresh fails, logout user
      setUser(null);
      setAuthenticated(false);
    },
  });
};

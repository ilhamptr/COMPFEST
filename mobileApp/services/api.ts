// Base API service configuration and utilities

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://api.ingredish.com";
const AI_API_URL =
  process.env.EXPO_PUBLIC_AI_API_URL || "https://ai.ingredish.com";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

class ApiService {
  private baseURL: string;
  private authToken: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  clearAuthToken() {
    this.authToken = null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        throw new ApiError(
          error.message || "API request failed",
          response.status,
          error.code,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Network error", 0);
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request<T>(`${endpoint}${queryString}`, {
      method: "GET",
    });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }

  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {};

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: formData,
      });

      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ message: "Upload failed" }));
        throw new ApiError(
          error.message || "Upload failed",
          response.status,
          error.code,
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Upload error", 0);
    }
  }
}

// Create instances
export const apiService = new ApiService(API_BASE_URL);
export const aiApiService = new ApiService(AI_API_URL);

// Response wrapper utilities
export const handleApiResponse = <T>(response: ApiResponse<T>): T => {
  return response.data;
};

export const handlePaginatedResponse = <T>(
  response: PaginatedResponse<T>,
): { items: T[]; pagination: PaginatedResponse<T>["pagination"] } => {
  return {
    items: response.data,
    pagination: response.pagination,
  };
};

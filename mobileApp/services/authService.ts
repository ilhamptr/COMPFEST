// Authentication and user management service

import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiService, handleApiResponse } from "./api";
import { User, LoginCredentials, RegisterCredentials } from "../types/user";

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

export class AuthService {
  // Login user
  static async login(credentials: LoginCredentials): Promise<{
    user: User;
    token: string;
    refreshToken: string;
  }> {
    const response = await apiService.post<{
      data: { user: User; token: string; refreshToken: string };
    }>("/auth/login", credentials);

    const { user, token, refreshToken } = handleApiResponse(response);

    // Store token and user data
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));

    // Set token for future requests
    apiService.setAuthToken(token);

    return { user, token, refreshToken };
  }

  // Register new user
  static async register(credentials: RegisterCredentials): Promise<{
    user: User;
    token: string;
    refreshToken: string;
  }> {
    const response = await apiService.post<{
      data: { user: User; token: string; refreshToken: string };
    }>("/auth/register", credentials);

    const { user, token, refreshToken } = handleApiResponse(response);

    // Store token and user data
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));

    // Set token for future requests
    apiService.setAuthToken(token);

    return { user, token, refreshToken };
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      // Call logout endpoint to invalidate token on server
      await apiService.post("/auth/logout");
    } catch (error) {
      // Continue with local logout even if server call fails
      console.warn("Server logout failed:", error);
    }

    // Clear local storage
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);

    // Clear API token
    apiService.clearAuthToken();
  }

  // Get current user
  static async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  // Check if user is authenticated
  static async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (token) {
        apiService.setAuthToken(token);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  }

  // Refresh authentication token
  static async refreshToken(refreshToken: string): Promise<{
    token: string;
    refreshToken: string;
  }> {
    const response = await apiService.post<{
      data: { token: string; refreshToken: string };
    }>("/auth/refresh", { refreshToken });

    const { token, refreshToken: newRefreshToken } =
      handleApiResponse(response);

    // Update stored token
    await AsyncStorage.setItem(TOKEN_KEY, token);
    apiService.setAuthToken(token);

    return { token, refreshToken: newRefreshToken };
  }

  // Update user profile
  static async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await apiService.put<{ data: User }>(
      "/auth/profile",
      updates,
    );
    const user = handleApiResponse(response);

    // Update stored user data
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));

    return user;
  }

  // Change password
  static async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    await apiService.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
  }

  // Request password reset
  static async requestPasswordReset(email: string): Promise<void> {
    await apiService.post("/auth/forgot-password", { email });
  }

  // Reset password with token
  static async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<void> {
    await apiService.post("/auth/reset-password", { token, newPassword });
  }

  // Verify email address
  static async verifyEmail(token: string): Promise<void> {
    await apiService.post("/auth/verify-email", { token });
  }

  // Resend email verification
  static async resendEmailVerification(): Promise<void> {
    await apiService.post("/auth/resend-verification");
  }

  // Delete user account
  static async deleteAccount(password: string): Promise<void> {
    await apiService.post("/auth/delete-account", { password });

    // Clear local storage
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
    apiService.clearAuthToken();
  }

  // Get user preferences
  static async getUserPreferences(): Promise<any> {
    const response = await apiService.get<{ data: any }>("/auth/preferences");
    return handleApiResponse(response);
  }

  // Update user preferences
  static async updateUserPreferences(preferences: any): Promise<any> {
    const response = await apiService.put<{ data: any }>(
      "/auth/preferences",
      preferences,
    );
    return handleApiResponse(response);
  }

  // Social login (Google, Apple, Facebook)
  static async socialLogin(
    provider: string,
    token: string,
  ): Promise<{
    user: User;
    token: string;
    refreshToken: string;
  }> {
    const response = await apiService.post<{
      data: { user: User; token: string; refreshToken: string };
    }>(`/auth/social/${provider}`, { token });

    const {
      user,
      token: authToken,
      refreshToken,
    } = handleApiResponse(response);

    // Store token and user data
    await AsyncStorage.setItem(TOKEN_KEY, authToken);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));

    // Set token for future requests
    apiService.setAuthToken(authToken);

    return { user, token: authToken, refreshToken };
  }

  // Initialize authentication state on app start
  static async initializeAuth(): Promise<{
    isAuthenticated: boolean;
    user: User | null;
  }> {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      const userData = await AsyncStorage.getItem(USER_KEY);

      if (token && userData) {
        apiService.setAuthToken(token);
        const user = JSON.parse(userData);
        return { isAuthenticated: true, user };
      }

      return { isAuthenticated: false, user: null };
    } catch (error) {
      console.error("Error initializing auth:", error);
      return { isAuthenticated: false, user: null };
    }
  }
}

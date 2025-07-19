// Environment configuration

export const env = {
  // API Configuration
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || "https://api.ingredish.com",
  AI_API_URL: process.env.EXPO_PUBLIC_AI_API_URL || "https://ai.ingredish.com",

  // Authentication
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES || "7d",
  ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES || "15m",

  // Third-party Services
  GOOGLE_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
  YOUTUBE_API_KEY: process.env.EXPO_PUBLIC_YOUTUBE_API_KEY,
  FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,

  // AI Services
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  GOOGLE_VISION_API_KEY: process.env.GOOGLE_VISION_API_KEY,

  // Image & Media
  CLOUDINARY_CLOUD_NAME: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  // Analytics
  MIXPANEL_TOKEN: process.env.EXPO_PUBLIC_MIXPANEL_TOKEN,
  AMPLITUDE_API_KEY: process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY,

  // Push Notifications
  EXPO_PUSH_TOKEN: process.env.EXPO_PUSH_TOKEN,
  FIREBASE_MESSAGING_SENDER_ID:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,

  // Development
  IS_DEV: process.env.NODE_ENV === "development",
  IS_PROD: process.env.NODE_ENV === "production",

  // Feature Flags
  ENABLE_AI_FEATURES: process.env.EXPO_PUBLIC_ENABLE_AI_FEATURES === "true",
  ENABLE_VOICE_COMMANDS:
    process.env.EXPO_PUBLIC_ENABLE_VOICE_COMMANDS === "true",
  ENABLE_AR_FEATURES: process.env.EXPO_PUBLIC_ENABLE_AR_FEATURES === "true",
  ENABLE_SOCIAL_LOGIN: process.env.EXPO_PUBLIC_ENABLE_SOCIAL_LOGIN === "true",

  // App Configuration
  APP_VERSION: process.env.EXPO_PUBLIC_APP_VERSION || "1.0.0",
  MIN_SUPPORTED_VERSION:
    process.env.EXPO_PUBLIC_MIN_SUPPORTED_VERSION || "1.0.0",

  // Cache Configuration
  IMAGE_CACHE_DURATION: parseInt(process.env.IMAGE_CACHE_DURATION || "86400"), // 24 hours
  API_CACHE_DURATION: parseInt(process.env.API_CACHE_DURATION || "300"), // 5 minutes

  // Rate Limiting
  API_RATE_LIMIT: parseInt(process.env.API_RATE_LIMIT || "100"), // requests per minute
  AI_RATE_LIMIT: parseInt(process.env.AI_RATE_LIMIT || "10"), // requests per minute

  // File Upload
  MAX_IMAGE_SIZE: parseInt(process.env.MAX_IMAGE_SIZE || "10485760"), // 10MB
  MAX_VIDEO_SIZE: parseInt(process.env.MAX_VIDEO_SIZE || "104857600"), // 100MB
  ALLOWED_IMAGE_TYPES: (
    process.env.ALLOWED_IMAGE_TYPES || "jpeg,jpg,png,webp"
  ).split(","),
  ALLOWED_VIDEO_TYPES: (process.env.ALLOWED_VIDEO_TYPES || "mp4,mov,avi").split(
    ",",
  ),

  // Localization
  DEFAULT_LANGUAGE: process.env.EXPO_PUBLIC_DEFAULT_LANGUAGE || "en",
  SUPPORTED_LANGUAGES: (
    process.env.EXPO_PUBLIC_SUPPORTED_LANGUAGES || "en,es,fr,de,it"
  ).split(","),

  // Database
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,

  // Email Service
  EMAIL_SERVICE_API_KEY: process.env.EMAIL_SERVICE_API_KEY,
  EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS || "noreply@ingredish.com",

  // Social Media
  FACEBOOK_APP_ID: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID,
  GOOGLE_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  APPLE_CLIENT_ID: process.env.EXPO_PUBLIC_APPLE_CLIENT_ID,

  // Payment
  STRIPE_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

  // Monitoring & Logging
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
  LOG_LEVEL: process.env.LOG_LEVEL || "info",

  // Geographic
  DEFAULT_COUNTRY: process.env.EXPO_PUBLIC_DEFAULT_COUNTRY || "US",
  DEFAULT_TIMEZONE:
    process.env.EXPO_PUBLIC_DEFAULT_TIMEZONE || "America/New_York",
} as const;

// Environment validation
export const validateEnv = () => {
  const requiredEnvVars = ["EXPO_PUBLIC_API_URL"];

  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
};

// Environment-specific configurations
export const getConfig = () => {
  const config = {
    development: {
      apiTimeout: 10000,
      retryAttempts: 3,
      logLevel: "debug",
      enableDevTools: true,
    },
    staging: {
      apiTimeout: 8000,
      retryAttempts: 2,
      logLevel: "info",
      enableDevTools: true,
    },
    production: {
      apiTimeout: 5000,
      retryAttempts: 2,
      logLevel: "error",
      enableDevTools: false,
    },
  };

  const environment = env.IS_PROD
    ? "production"
    : env.IS_DEV
      ? "development"
      : "staging";
  return config[environment];
};

// Feature flag helpers
export const isFeatureEnabled = (feature: keyof typeof env): boolean => {
  const value = env[feature];
  return typeof value === "boolean" ? value : false;
};

// API endpoint builders
export const buildApiUrl = (endpoint: string): string => {
  return `${env.API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
};

export const buildAiApiUrl = (endpoint: string): string => {
  return `${env.AI_API_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
};

// Media URL builders
export const buildImageUrl = (path: string, transforms?: string): string => {
  if (!env.CLOUDINARY_CLOUD_NAME) return path;

  const baseUrl = `https://res.cloudinary.com/${env.CLOUDINARY_CLOUD_NAME}/image/upload`;
  const transformStr = transforms ? `/${transforms}` : "";

  return `${baseUrl}${transformStr}/${path}`;
};

export const buildVideoUrl = (path: string, transforms?: string): string => {
  if (!env.CLOUDINARY_CLOUD_NAME) return path;

  const baseUrl = `https://res.cloudinary.com/${env.CLOUDINARY_CLOUD_NAME}/video/upload`;
  const transformStr = transforms ? `/${transforms}` : "";

  return `${baseUrl}${transformStr}/${path}`;
};

export default env;

/**
 * API Client for making HTTP requests to the backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export interface RequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Generic API client for making HTTP requests
 */
export async function apiClient<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { method = "GET", headers = {}, body, params } = config;

  // Build URL with query parameters
  let url = `${API_URL}${endpoint}`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url = `${url}?${queryString}`;
  }

  // Build request options
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Add body for POST, PUT, PATCH requests
  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      if (!response.ok) {
        throw new ApiError(
          response.status,
          `HTTP error! status: ${response.status}`
        );
      }
      return {} as T;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error || data.message || "An error occurred",
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network or other errors
    throw new ApiError(
      0,
      error instanceof Error ? error.message : "Network error occurred"
    );
  }
}

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
  get: <T>(endpoint: string, params?: Record<string, string>) =>
    apiClient<T>(endpoint, { method: "GET", params }),

  post: <T>(endpoint: string, body?: any) =>
    apiClient<T>(endpoint, { method: "POST", body }),

  put: <T>(endpoint: string, body?: any) =>
    apiClient<T>(endpoint, { method: "PUT", body }),

  patch: <T>(endpoint: string, body?: any) =>
    apiClient<T>(endpoint, { method: "PATCH", body }),

  delete: <T>(endpoint: string) =>
    apiClient<T>(endpoint, { method: "DELETE" }),
};

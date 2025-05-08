import { ErrorInfo } from "react";

// Types of errors we want to track
export type ErrorSeverity = "low" | "medium" | "high" | "critical";

export interface ErrorLogData {
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  timestamp: string;
  userAgent: string;
  severity: ErrorSeverity;
  userId?: string;
  additionalInfo?: Record<string, any>;
}

/**
 * Logs errors to the console and could be extended to send to a backend service
 */
export const logError = (
  error: Error,
  errorInfo?: ErrorInfo,
  severity: ErrorSeverity = "medium",
  userId?: string,
  additionalInfo?: Record<string, any>,
): void => {
  // Create the error log data
  const errorLogData: ErrorLogData = {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo?.componentStack,
    url: window.location.href,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    severity,
    userId,
    additionalInfo,
  };

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.group("%cError Logged", "color: red; font-weight: bold;");
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
    console.error("Log Data:", errorLogData);
    console.groupEnd();
  }

  // In a production environment, you would send this to your error tracking service
  // Example with a hypothetical API call:
  // sendToErrorTrackingService(errorLogData);
};

/**
 * Example function to send errors to a backend service
 * This would be implemented with your actual error tracking service
 */
const sendToErrorTrackingService = async (
  errorLogData: ErrorLogData,
): Promise<void> => {
  try {
    // This is just a placeholder - replace with your actual error tracking service
    // await fetch('https://your-error-tracking-service.com/api/log', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(errorLogData),
    // });
    console.log("Error sent to tracking service", errorLogData);
  } catch (err) {
    // Fallback logging if the error service itself fails
    console.error("Failed to send error to tracking service:", err);
  }
};

/**
 * Utility to handle API errors consistently
 */
export const handleApiError = (
  error: any,
  context: string,
  severity: ErrorSeverity = "medium",
  userId?: string,
): { message: string; details?: string } => {
  // Log the error
  logError(
    error instanceof Error ? error : new Error(String(error)),
    undefined,
    severity,
    userId,
    { context },
  );

  // Return a user-friendly error message
  return {
    message: getUserFriendlyErrorMessage(error, context),
    details: error instanceof Error ? error.message : String(error),
  };
};

/**
 * Convert technical errors to user-friendly messages
 */
const getUserFriendlyErrorMessage = (error: any, context: string): string => {
  // Check for network errors
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return "Unable to connect to the server. Please check your internet connection.";
  }

  // Check for timeout errors
  if (
    error.name === "TimeoutError" ||
    (error.message && error.message.includes("timeout"))
  ) {
    return "The request took too long to complete. Please try again.";
  }

  // Check for authentication errors
  if (
    error.status === 401 ||
    (error.message && error.message.includes("authentication"))
  ) {
    return "Your session has expired. Please log in again.";
  }

  // Check for permission errors
  if (error.status === 403) {
    return "You don't have permission to perform this action.";
  }

  // Check for not found errors
  if (error.status === 404) {
    return "The requested resource was not found.";
  }

  // Check for validation errors
  if (
    error.status === 422 ||
    (error.message && error.message.includes("validation"))
  ) {
    return "There was a problem with the data you submitted. Please check and try again.";
  }

  // Check for server errors
  if (error.status >= 500) {
    return "The server encountered an error. Please try again later.";
  }

  // Default error message with context
  return `An error occurred while ${context.toLowerCase()}. Please try again.`;
};

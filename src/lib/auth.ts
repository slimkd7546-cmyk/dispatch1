// Simple authentication utility functions

/**
 * Check if the user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return localStorage.getItem("isAuthenticated") === "true";
};

/**
 * Get the current user's role
 */
export const getUserRole = (): string => {
  return localStorage.getItem("userRole") || "";
};

/**
 * Log the user out
 */
export const logout = (): void => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userRole");
  window.location.href = "/";
};

/**
 * Log the user in
 */
export const login = (email: string, role: string): void => {
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("userRole", role);
};

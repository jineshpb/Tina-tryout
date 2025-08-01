// Simple localStorage utilities for password protection
// This is NOT authentication - just remembering if user entered correct password

export const AUTH_PREFIX = "auth_"

// Store that user entered correct password for this link
export const setAuth = (link: string): void => {
  const authKey = `${AUTH_PREFIX}${link}`
  localStorage.setItem(authKey, "true")
}

// Check if user already entered correct password for this link
export const checkAuth = (link: string): boolean => {
  const authKey = `${AUTH_PREFIX}${link}`
  return localStorage.getItem(authKey) === "true"
}

// Remove stored password for this link
export const clearAuth = (link: string): void => {
  const authKey = `${AUTH_PREFIX}${link}`
  localStorage.removeItem(authKey)
}

// Remove all stored passwords
export const clearAllAuth = (): void => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(AUTH_PREFIX)) {
      localStorage.removeItem(key)
    }
  })
}

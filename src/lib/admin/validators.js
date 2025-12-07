// src/lib/admin/validators.js
// Validation functions untuk admin forms

/**
 * Validate slug format
 * Slug harus lowercase, alphanumeric, dan dash/underscore
 */
export function validateSlug(slug) {
  if (!slug) {
    return { valid: false, error: "Slug is required" };
  }

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(slug)) {
    return {
      valid: false,
      error: "Slug must be lowercase, alphanumeric, and use dashes (e.g., 'kotagede-heritage-walk')",
    };
  }

  return { valid: true };
}

/**
 * Validate email format
 */
export function validateEmail(email) {
  if (!email) {
    return { valid: false, error: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }

  return { valid: true };
}

/**
 * Validate required field
 */
export function validateRequired(value, fieldName) {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return { valid: false, error: `${fieldName} is required` };
  }
  return { valid: true };
}

/**
 * Validate URL format
 */
export function validateUrl(url, required = false) {
  if (!url) {
    if (required) {
      return { valid: false, error: "URL is required" };
    }
    return { valid: true };
  }

  try {
    new URL(url);
    return { valid: true };
  } catch {
    return { valid: false, error: "Invalid URL format" };
  }
}

/**
 * Validate date
 */
export function validateDate(date, required = false) {
  if (!date) {
    if (required) {
      return { valid: false, error: "Date is required" };
    }
    return { valid: true };
  }

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return { valid: false, error: "Invalid date format" };
  }

  return { valid: true };
}

/**
 * Validate array is not empty
 */
export function validateArrayNotEmpty(array, fieldName) {
  if (!Array.isArray(array) || array.length === 0) {
    return { valid: false, error: `${fieldName} must have at least one item` };
  }
  return { valid: true };
}

/**
 * Validate number
 */
export function validateNumber(value, fieldName, min = null, max = null) {
  if (value === null || value === undefined || value === "") {
    return { valid: false, error: `${fieldName} is required` };
  }

  const num = Number(value);
  if (isNaN(num)) {
    return { valid: false, error: `${fieldName} must be a number` };
  }

  if (min !== null && num < min) {
    return { valid: false, error: `${fieldName} must be at least ${min}` };
  }

  if (max !== null && num > max) {
    return { valid: false, error: `${fieldName} must be at most ${max}` };
  }

  return { valid: true };
}


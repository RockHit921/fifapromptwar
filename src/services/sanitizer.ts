/**
 * Input Security & XSS Sanitization Utility
 */

import { API_KEY_PATTERN } from '../constants';

/**
 * Sanitizes input string to prevent XSS attacks by escaping HTML special characters.
 * @param {string} input - The raw input string.
 * @returns {string} The sanitized string.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Validates the format of a Google API key.
 * @param {string} key - The API key to validate.
 * @returns {boolean} True if the key matches the expected format, false otherwise.
 */
export function validateApiKeyFormat(key: string): boolean {
  if (!key) return false;
  return API_KEY_PATTERN.test(key.trim());
}

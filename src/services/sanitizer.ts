/**
 * Input Security & XSS Sanitization Utility
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

export function validateApiKeyFormat(key: string): boolean {
  if (!key) return false;
  // Google API keys typically start with AIzaSy and are ~39 characters long
  return /^AIzaSy[A-Za-z0-9_-]{33}$/.test(key.trim());
}

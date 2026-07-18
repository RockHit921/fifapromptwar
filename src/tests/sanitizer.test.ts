import { describe, it, expect } from 'vitest';
import { sanitizeInput, validateApiKeyFormat } from '../services/sanitizer';

describe('Sanitizer Security Utility', () => {
  it('escapes HTML special characters to prevent XSS injection', () => {
    const dangerousInput = '<script>alert("xss")</script>';
    const sanitized = sanitizeInput(dangerousInput);
    expect(sanitized).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
  });

  it('validates Google Gemini API key format correctly', () => {
    const validKey = 'AIzaSy1234567890abcdefghijklmnopqrstuvw';
    const invalidKey = 'invalid_key_format';
    expect(validateApiKeyFormat(validKey)).toBe(true);
    expect(validateApiKeyFormat(invalidKey)).toBe(false);
  });
});

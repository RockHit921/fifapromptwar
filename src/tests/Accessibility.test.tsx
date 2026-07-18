import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { AccessibilityProvider, useAccessibility } from '../context/AccessibilityContext';

const TestComponent: React.FC = () => {
  const { highContrast, toggleHighContrast, announceForScreenReader, screenReaderAnnouncement } = useAccessibility();

  return (
    <div>
      <button onClick={toggleHighContrast}>Toggle Contrast</button>
      <button onClick={() => announceForScreenReader('Gate A open')}>Announce</button>
      <span data-testid="contrast-status">{String(highContrast)}</span>
      <span data-testid="aria-announcement">{screenReaderAnnouncement}</span>
    </div>
  );
};

describe('AccessibilityProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('toggles high contrast mode and updates document element class', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    const toggleBtn = screen.getByText('Toggle Contrast');
    expect(screen.getByTestId('contrast-status').textContent).toBe('false');

    act(() => {
      toggleBtn.click();
    });

    expect(screen.getByTestId('contrast-status').textContent).toBe('true');
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
  });

  it('updates screen reader live region announcement', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    const announceBtn = screen.getByText('Announce');

    act(() => {
      announceBtn.click();
    });

    expect(screen.getByTestId('aria-announcement').textContent).toBe('Gate A open');
  });
});

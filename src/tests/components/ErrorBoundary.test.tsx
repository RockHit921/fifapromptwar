import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';

const FaultyComponent: React.FC = () => {
  throw new Error('Simulated component crash');
};

describe('ErrorBoundary Component', () => {
  it('renders child components normally when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Normal Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal Child Component')).toBeInTheDocument();
  });

  it('catches component error and renders fallback error card', () => {
    // Suppress console.error during expected throw test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary fallbackTitle="Custom Error Boundary">
        <FaultyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom Error Boundary')).toBeInTheDocument();
    expect(screen.getByText('Simulated component crash')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});

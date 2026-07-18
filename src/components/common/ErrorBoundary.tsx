import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="glass-card rounded-2xl p-6 border border-red-500/30 bg-red-950/20 flex flex-col items-center justify-center text-center space-y-3">
          <div className="p-3 rounded-full bg-red-500/20 text-red-400">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-white">
            {this.props.fallbackTitle || 'Component Encountered an Error'}
          </h3>
          <p className="text-xs text-slate-300 max-w-sm">
            {this.state.error?.message || 'An unexpected rendering error occurred.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-500 transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Recover Component
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

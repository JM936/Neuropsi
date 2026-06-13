import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Atualiza o estado para que a próxima renderização mostre a UI de fallback
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Capturado pelo ErrorBoundary global da Neuropsi:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neuro-darkBg p-6">
          <div className="w-full max-w-md bg-glass border border-red-500/20 p-8 rounded-2xl shadow-glass text-center relative overflow-hidden">
            {/* Brilho vermelho sutil de fundo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-500/5 rounded-full blur-3xl -z-10" />
            
            <div className="p-4 bg-red-500/10 rounded-full w-fit mx-auto mb-6 border border-red-500/20 text-red-400">
              <AlertTriangle size={32} />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold font-title text-white mb-3">
              Ops! Algo deu errado.
            </h1>
            
            <p className="text-sm text-neuro-textSecondary mb-6 leading-relaxed">
              Ocorreu uma falha inesperada na renderização do aplicativo. Nossa equipe já foi notificada e estamos trabalhando para solucionar.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="mb-6 p-4 bg-black/40 border border-white/5 rounded-lg text-left text-xs font-mono text-red-300 max-h-36 overflow-y-auto">
                {this.state.error.toString()}
              </div>
            )}

            <Button
              variant="primary"
              onClick={this.handleReset}
              className="gap-2 px-6 min-h-[44px] mx-auto shadow-glow-red"
            >
              <RefreshCw size={16} />
              Voltar ao Início
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

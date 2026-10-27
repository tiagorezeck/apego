import React from 'react';

interface HeaderProps {
  currentView: 'test' | 'report' | 'theory';
  onNavigate: (view: 'test' | 'report' | 'theory') => void;
  answeredCount: number;
  totalQuestions: number;
  hasCompletedTest: boolean;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  answeredCount,
  totalQuestions,
  hasCompletedTest,
  onReset,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('test')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-indigo-600 transition-colors text-left"
        >
          Apego & Origem
        </button>

        {/* Zone 2: Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('test')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 pb-1 border-b-2 ${
              currentView === 'test'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent'
            }`}
          >
            Questionário ({answeredCount}/{totalQuestions})
          </button>

          <button
            onClick={() => onNavigate('report')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 pb-1 border-b-2 ${
              currentView === 'report'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent'
            }`}
          >
            Relatório Clínico
          </button>

          <button
            onClick={() => onNavigate('theory')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 pb-1 border-b-2 ${
              currentView === 'theory'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent'
            }`}
          >
            Fundamentação Teórica
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {currentView === 'test' ? (
            answeredCount === totalQuestions ? (
              <button
                onClick={() => onNavigate('report')}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                Ver Relatório Completo
              </button>
            ) : (
              <button
                onClick={() => onNavigate('report')}
                className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Prévia do Relatório
              </button>
            )
          ) : (
            <button
              onClick={() => onNavigate('test')}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              Voltar ao Teste
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav subrow for screens < md */}
      <div className="md:hidden flex items-center justify-around px-4 py-2 bg-slate-50 border-t border-slate-200 text-xs font-medium">
        <button
          onClick={() => onNavigate('test')}
          className={`py-1 px-2 ${
            currentView === 'test' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          Teste ({answeredCount}/{totalQuestions})
        </button>
        <button
          onClick={() => onNavigate('report')}
          className={`py-1 px-2 ${
            currentView === 'report' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          Relatório
        </button>
        <button
          onClick={() => onNavigate('theory')}
          className={`py-1 px-2 ${
            currentView === 'theory' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          Teoria
        </button>
      </div>
    </header>
  );
};

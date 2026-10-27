import React, { useState, useEffect, useRef } from 'react';
import {
  TESTE_AVANCADO_DATA,
  OPCOES_RESPOSTA,
  DIMENSOES_META,
  PRESETS_TESTE,
  DimensionId,
} from '../data/assessmentData';
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

interface AssessmentViewProps {
  respostas: Record<number, number>;
  onAnswer: (questionId: number, value: number) => void;
  onLoadPreset: (presetKey: string) => void;
  onClear: () => void;
  onFinish: () => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  respostas,
  onAnswer,
  onLoadPreset,
  onClear,
  onFinish,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);
  const currentQuestion = TESTE_AVANCADO_DATA[currentIndex];
  const dimensionMeta = DIMENSOES_META[currentQuestion.dimensao];

  const answeredCount = Object.keys(respostas).length;
  const isComplete = answeredCount === TESTE_AVANCADO_DATA.length;
  const progressPercent = Math.round((answeredCount / TESTE_AVANCADO_DATA.length) * 100);

  // Keyboard navigation (1-5 for options, ArrowLeft/Right for nav)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid if user is in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 5) {
        handleSelectOption(num);
      } else if (e.key === 'ArrowRight' && currentIndex < TESTE_AVANCADO_DATA.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestion.id, autoAdvance]);

  const handleSelectOption = (val: number) => {
    onAnswer(currentQuestion.id, val);
    if (autoAdvance && currentIndex < TESTE_AVANCADO_DATA.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 180);
    }
  };

  const currentAnswer = respostas[currentQuestion.id];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Intro Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Inventário Estendido de Origem Comportamental & Apego
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Avaliação de 36 itens fundamentada na Teoria do Apego (Bowlby, Ainsworth e Collins & Read)
            </p>
          </div>

          {/* Quick preset selector & clear */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPresetsMenu(!showPresetsMenu)}
              className="text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simular Perfil</span>
            </button>

            {answeredCount > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Deseja realmente limpar todas as respostas?')) {
                    onClear();
                    setCurrentIndex(0);
                  }
                }}
                className="text-xs font-medium text-slate-500 hover:text-rose-600 px-2 py-1.5 transition-colors flex items-center gap-1"
                title="Limpar respostas"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Limpar</span>
              </button>
            )}
          </div>
        </div>

        {/* Preset Selector Dropdown */}
        {showPresetsMenu && (
          <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(PRESETS_TESTE).map(([key, item]) => (
              <button
                key={key}
                onClick={() => {
                  onLoadPreset(key);
                  setShowPresetsMenu(false);
                }}
                className="text-left p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors"
              >
                <span className="block text-xs font-bold text-slate-900">{item.label}</span>
                <span className="block text-[11px] text-slate-500 mt-1 leading-snug">
                  {item.desc}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Global Progress Strip */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">Progresso do Teste</span>
              <span className="text-slate-400">·</span>
              <span className="font-mono tabular-nums">
                {answeredCount} de {TESTE_AVANCADO_DATA.length} respondidas
              </span>
            </div>
            <span className="font-mono font-bold text-indigo-600 tabular-nums">
              {progressPercent}%
            </span>
          </div>

          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs mb-6 relative">
        {/* Dimension & Question Index Info */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-mono font-bold text-indigo-600 text-sm">
              Item {currentQuestion.id.toString().padStart(2, '0')}
            </span>
            <span>/</span>
            <span>36</span>
            <span className="mx-1">·</span>
            <span className="font-medium text-slate-700">{dimensionMeta.title}</span>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoAdvance}
              onChange={(e) => setAutoAdvance(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Avanço automático ao responder</span>
          </label>
        </div>

        {/* Question Text */}
        <div className="min-h-[90px] flex items-center mb-8">
          <h2 className="text-lg sm:text-2xl font-semibold text-slate-900 leading-relaxed sm:leading-snug">
            "{currentQuestion.pergunta}"
          </h2>
        </div>

        {/* 5 Response Buttons */}
        <div className="space-y-2.5">
          {[1, 2, 3, 4, 5].map((val) => {
            const isSelected = currentAnswer === val;
            const opInfo = OPCOES_RESPOSTA[val];

            return (
              <button
                key={val}
                onClick={() => handleSelectOption(val)}
                className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold ring-2 ring-indigo-500/30'
                    : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {val}
                  </span>
                  <span className="text-sm sm:text-base">{opInfo.label}</span>
                </div>

                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  [tecla {val}]
                </span>
              </button>
            );
          })}
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <span className="text-xs text-slate-400 font-mono">
            {currentIndex + 1} de {TESTE_AVANCADO_DATA.length}
          </span>

          <button
            onClick={() =>
              setCurrentIndex((prev) => Math.min(TESTE_AVANCADO_DATA.length - 1, prev + 1))
            }
            disabled={currentIndex === TESTE_AVANCADO_DATA.length - 1}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg hover:bg-slate-100 transition-colors"
          >
            <span>Próxima</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Completion Banner if ready */}
      {isComplete ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-emerald-900 text-center sm:text-left">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <h3 className="font-bold text-sm sm:text-base">Todas as 36 questões foram respondidas!</h3>
              <p className="text-xs text-emerald-700 mt-0.5">
                O algoritmo psicométrico de correção está pronto para compor o seu relatório completo.
              </p>
            </div>
          </div>

          <button
            onClick={onFinish}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            Gerar Relatório Completo ▶
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-slate-100 rounded-xl p-4 mb-8 text-xs text-slate-600">
          <span>
            Responda as {TESTE_AVANCADO_DATA.length - answeredCount} questões restantes para obter a análise clínica definitiva.
          </span>
          <button
            onClick={onFinish}
            className="text-xs font-medium text-indigo-700 hover:text-indigo-900 underline"
          >
            Visualizar prévia parcial
          </button>
        </div>
      )}

      {/* Quick Jump Matrix (Grouped by Dimension) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          Navegação Rápida pelos 36 Itens
        </h3>

        <div className="space-y-4">
          {(['DEPEND', 'ANXIETY', 'CLOSE'] as DimensionId[]).map((dimKey) => {
            const meta = DIMENSOES_META[dimKey];
            const items = TESTE_AVANCADO_DATA.filter((q) => q.dimensao === dimKey);

            return (
              <div key={dimKey} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-medium text-slate-800">{meta.title}</span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {items.filter((q) => respostas[q.id] !== undefined).length}/{items.length} respondidos
                  </span>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                  {items.map((item) => {
                    const isAnswered = respostas[item.id] !== undefined;
                    const isCurrent = item.id === currentQuestion.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentIndex(item.id - 1)}
                        className={`h-8 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                          isCurrent
                            ? 'ring-2 ring-indigo-600 bg-indigo-600 text-white font-bold'
                            : isAnswered
                            ? 'bg-indigo-50 text-indigo-900 border border-indigo-200 hover:bg-indigo-100'
                            : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'
                        }`}
                        title={`Item ${item.id}: ${item.pergunta.slice(0, 45)}...`}
                      >
                        {item.id}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

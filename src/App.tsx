import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AssessmentView } from './components/AssessmentView';
import { ReportView } from './components/ReportView';
import { TheoryView } from './components/TheoryView';
import {
  calcularDiagnostico,
  TESTE_AVANCADO_DATA,
  PRESETS_TESTE,
} from './data/assessmentData';

const STORAGE_KEY = 'inventario_apego_respostas_v1';

export default function App() {
  const [respostas, setRespostas] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Falha ao restaurar respostas salvas:', e);
    }
    return {};
  });

  const [currentView, setCurrentView] = useState<'test' | 'report' | 'theory'>('test');

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(respostas));
    } catch (e) {
      console.error('Falha ao salvar respostas:', e);
    }
  }, [respostas]);

  const handleAnswer = (questionId: number, value: number) => {
    setRespostas((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleLoadPreset = (presetKey: string) => {
    const preset = PRESETS_TESTE[presetKey];
    if (preset) {
      setRespostas(preset.answers);
      setCurrentView('report');
    }
  };

  const handleClear = () => {
    setRespostas({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const diagnostic = calcularDiagnostico(respostas);
  const totalAnswered = Object.keys(respostas).length;
  const isComplete = totalAnswered === TESTE_AVANCADO_DATA.length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        answeredCount={totalAnswered}
        totalQuestions={TESTE_AVANCADO_DATA.length}
        hasCompletedTest={isComplete}
        onReset={handleClear}
      />

      <main className="flex-1">
        {currentView === 'test' && (
          <AssessmentView
            respostas={respostas}
            onAnswer={handleAnswer}
            onLoadPreset={handleLoadPreset}
            onClear={handleClear}
            onFinish={() => setCurrentView('report')}
          />
        )}

        {currentView === 'report' && (
          <ReportView
            diagnostic={diagnostic}
            respostas={respostas}
            onEditAnswers={() => setCurrentView('test')}
            onRestartTest={() => {
              if (window.confirm('Tem certeza de que deseja reiniciar o teste do zero?')) {
                handleClear();
                setCurrentView('test');
              }
            }}
          />
        )}

        {currentView === 'theory' && (
          <TheoryView onStartTest={() => setCurrentView('test')} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-auto text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-semibold text-slate-800">
              Inventário Estendido de Origem Comportamental e Apego
            </span>
            <span className="mx-2">·</span>
            <span>36 Itens Psicométricos</span>
          </div>
          <div className="text-slate-400">
            Baseado no modelo clínico de apego adulto (Bowlby, Ainsworth e Collins & Read)
          </div>
        </div>
      </footer>
    </div>
  );
}

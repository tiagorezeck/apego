import React, { useState } from 'react';
import {
  DiagnosticResult,
  TESTE_AVANCADO_DATA,
  OPCOES_RESPOSTA,
  DIMENSOES_META,
  DimensionId,
} from '../data/assessmentData';
import { RadarChart } from './RadarChart';
import { CartesianMatrix } from './CartesianMatrix';
import { DimensionBars } from './DimensionBars';
import {
  Printer,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  HeartHandshake,
  Compass,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ReportViewProps {
  diagnostic: DiagnosticResult;
  respostas: Record<number, number>;
  onEditAnswers: () => void;
  onRestartTest: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  diagnostic,
  respostas,
  onEditAnswers,
  onRestartTest,
}) => {
  const [copied, setCopied] = useState(false);
  const [filterDim, setFilterDim] = useState<DimensionId | 'ALL'>('ALL');
  const [showItemDetails, setShowItemDetails] = useState(false);

  const { medias, estilo, coordenadas, totalRespondidas, percentualConclusao } = diagnostic;

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = async () => {
    const text = `
INVENTÁRIO ESTENDIDO DE ORIGEM COMPORTAMENTAL E APEGO (36 ITENS)
-----------------------------------------------------------------
DIAGNÓSTICO: ${estilo.nome.toUpperCase()}
Subtítulo: ${estilo.subtitulo}

MÉTRICAS PSICOMÉTRICAS:
• Confiança no Suporte: ${medias.DEPEND.toFixed(2)} / 5.00
• Ansiedade de Abandono: ${medias.ANXIETY.toFixed(2)} / 5.00
• Conforto com Intimidade: ${medias.CLOSE.toFixed(2)} / 5.00
• Coordenadas Cartesianas: Evasão=${coordenadas.evasaoX.toFixed(2)} | Ansiedade=${coordenadas.ansiedadeY.toFixed(2)}

RESUMO CLÍNICO:
${estilo.resumoClinico}

ORIGEM NA INFÂNCIA:
${estilo.origemInfancia}

DINÂMICA NO ADULTO:
${estilo.dinamicaAdulto}
`.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredQuestions =
    filterDim === 'ALL'
      ? TESTE_AVANCADO_DATA
      : TESTE_AVANCADO_DATA.filter((q) => q.dimensao === filterDim);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:py-0 print:px-0">
      {/* Top Banner / Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Avaliação Psicométrica</span>
            <span>·</span>
            <span>Inventário de 36 Itens</span>
            <span>·</span>
            <span>Emissão: {new Date().toLocaleDateString('pt-BR')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Relatório de Origem e Estilo de Apego
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar Resumo'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / PDF</span>
          </button>

          <button
            onClick={onEditAnswers}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
          >
            <span>Editar Respostas</span>
          </button>
        </div>
      </div>

      {/* Warning if incomplete */}
      {totalRespondidas < 36 && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-3 text-xs text-amber-900 no-print">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Atenção: Você respondeu {totalRespondidas} de 36 questões ({percentualConclusao}%). Este relatório é uma prévia preliminar.
            </span>
          </div>
          <button
            onClick={onEditAnswers}
            className="font-bold underline text-amber-950 hover:text-amber-800 shrink-0 cursor-pointer"
          >
            Completar teste
          </button>
        </div>
      )}

      {/* Primary Diagnosis Hero Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Diagnóstico Clínico Principal</span>
              <span>·</span>
              <span className="font-mono">{estilo.cartesianZone}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {estilo.nome}
            </h2>
            <p className="text-base font-medium text-indigo-700">{estilo.subtitulo}</p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/70 shrink-0">
            <div className="text-center px-2">
              <span className="text-[11px] font-semibold text-slate-500 block mb-0.5 uppercase tracking-wide">
                Confiança
              </span>
              <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                {medias.DEPEND.toFixed(2)}
              </span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-2">
              <span className="text-[11px] font-semibold text-slate-500 block mb-0.5 uppercase tracking-wide">
                Ansiedade
              </span>
              <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                {medias.ANXIETY.toFixed(2)}
              </span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-2">
              <span className="text-[11px] font-semibold text-slate-500 block mb-0.5 uppercase tracking-wide">
                Intimidade
              </span>
              <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                {medias.CLOSE.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Resumo do Algoritmo */}
        <div className="mt-6 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Síntese do Algoritmo Psicométrico
          </h3>
          <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
            {estilo.resumoClinico}
          </p>
        </div>
      </div>

      {/* Interactive Charts Section (Radar & Cartesian Matrix) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Chart 1: Multidimensional Radar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-slate-900">
                1. Gráfico de Radar das 3 Subescalas
              </h3>
              <span className="text-xs text-slate-500 font-mono">1.0 a 5.0</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Comparação da sua pontuação real (polígono roxo) contra a média segura de referência (linha pontilhada cinza).
            </p>
          </div>

          <div className="py-2 flex items-center justify-center">
            <RadarChart scores={medias} showBenchmark={true} />
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Dimensões: Confiança no Suporte · Ansiedade de Abandono · Conforto com Intimidade</span>
            <span className="font-mono">Total: 36 Itens</span>
          </div>
        </div>

        {/* Chart 2: Bartholomew 2D Cartesian Attachment Model */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-slate-900">
                2. Matriz Cartesiana de Apego Adulto
              </h3>
              <span className="text-xs text-slate-500 font-mono">Modelo de Bartholomew e Horowitz</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Mapeamento do ponto de equilíbrio entre a Evasão da Intimidade (eixo X) e a Ansiedade de Abandono (eixo Y).
            </p>
          </div>

          <div className="py-2 flex items-center justify-center">
            <CartesianMatrix
              evasaoX={coordenadas.evasaoX}
              ansiedadeY={coordenadas.ansiedadeY}
              estiloAtivo={estilo.id}
            />
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Ponto destacado: Seu estilo comportamental dominante</span>
            <span className="font-semibold text-indigo-600">
              {estilo.nome}
            </span>
          </div>
        </div>
      </div>

      {/* Subscale Progress Bars Grid */}
      <div className="mb-10">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900">
            Detalhamento das Dimensões Psicométricas
          </h3>
          <p className="text-xs text-slate-500">
            Médias aritméticas calculadas com correção de itens invertidos (escala de 1.00 a 5.00)
          </p>
        </div>

        <DimensionBars medias={medias} />
      </div>

      {/* Deep Clinical Interpretation Cards */}
      <div className="space-y-6 mb-12">
        <h3 className="text-lg font-bold text-slate-900">
          Análise Clínica Estrutural
        </h3>

        {/* Section 1: Origem na Infância */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>01. Origem na Primeira Infância & Relação com Cuidadores</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {estilo.origemInfancia}
          </p>
        </div>

        {/* Section 2: Dinâmica Adulta */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
            <HeartHandshake className="w-4 h-4 text-indigo-600" />
            <span>02. Manifestação nos Relacionamentos Adultos</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {estilo.dinamicaAdulto}
          </p>
        </div>

        {/* Section 3: Gatilhos e Mecanismos de Defesa (2 Cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gatilhos */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Gatilhos Emocionais Típicos</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {estilo.gatilhosEmocionais.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-600 font-mono shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mecanismos de Defesa */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              <span>Mecanismos de Defesa Automáticos</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {estilo.mecanismosDefesa.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-slate-500 font-mono shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 4: Caminhos para a Segurança Adquirida */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>04. Estratégias Terapêuticas para o Apego Seguro Adquirido</span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            O estilo de apego não é uma sentença biológica imutável; é um modelo operacional interno plástico que pode ser reconfigurado com intervenções conscientes e novas experiências de segurança relacional.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {estilo.caminhosCrescimento.map((rec, i) => (
              <div
                key={i}
                className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-lg text-xs text-slate-700 leading-relaxed flex items-start gap-2.5"
              >
                <span className="w-5 h-5 rounded-md bg-white border border-slate-200 text-slate-700 flex items-center justify-center font-mono font-bold shrink-0 text-[10px]">
                  {i + 1}
                </span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collapsible Item-by-Item Verification Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs mb-10 no-print">
        <button
          onClick={() => setShowItemDetails(!showItemDetails)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Detalhamento dos 36 Itens e Correção Algorítmica
              </h3>
              <p className="text-xs text-slate-500">
                Audite cada resposta bruta, a lógica de itens invertidos e a pontuação final de cada pergunta.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
            <span>{showItemDetails ? 'Ocultar Tabela' : 'Visualizar Tabela'}</span>
            {showItemDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showItemDetails && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs text-slate-400 mr-2">Filtrar Dimensão:</span>
              <button
                onClick={() => setFilterDim('ALL')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  filterDim === 'ALL'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todos os Itens (36)
              </button>
              {(['DEPEND', 'ANXIETY', 'CLOSE'] as DimensionId[]).map((dim) => {
                const rotulos: Record<DimensionId, string> = {
                  DEPEND: 'Confiança',
                  ANXIETY: 'Ansiedade',
                  CLOSE: 'Intimidade',
                };
                return (
                  <button
                    key={dim}
                    onClick={() => setFilterDim(dim)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      filterDim === dim
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {rotulos[dim]} (12)
                  </button>
                );
              })}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-mono">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Dimensão</th>
                    <th className="py-2.5 px-3">Enunciado da Pergunta</th>
                    <th className="py-2.5 px-3 text-center">Invertido?</th>
                    <th className="py-2.5 px-3 text-center">Resposta Bruta</th>
                    <th className="py-2.5 px-3 text-right">Nota Final</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQuestions.map((item) => {
                    const raw = respostas[item.id] ?? 3;
                    const finalScore = item.inverter ? 6 - raw : raw;

                    return (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-500">
                          {item.id.toString().padStart(2, '0')}
                        </td>
                        <td className="py-2.5 px-3 font-medium text-indigo-700">
                          {DIMENSOES_META[item.dimensao].title}
                        </td>
                        <td className="py-2.5 px-3 text-slate-800 max-w-md">
                          {item.pergunta}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono">
                          {item.inverter ? (
                            <span className="text-amber-700 font-semibold">Sim (6 - X)</span>
                          ) : (
                            <span className="text-slate-400">Não</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-medium text-slate-700 tabular-nums">
                          {raw} ({OPCOES_RESPOSTA[raw]?.short})
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                          {finalScore}.00
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 text-xs text-slate-500 no-print">
        <p>
          Inventário de Apego e Origem Comportamental · Escala Psicométrica para fins educativos e reflexivos.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={onRestartTest}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Refazer Teste do Zero</span>
          </button>
        </div>
      </div>
    </div>
  );
};

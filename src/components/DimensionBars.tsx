import React from 'react';
import { DimensionId, DIMENSOES_META } from '../data/assessmentData';

interface DimensionBarsProps {
  medias: Record<DimensionId, number>;
}

export const DimensionBars: React.FC<DimensionBarsProps> = ({ medias }) => {
  const getLevel = (score: number, dim: DimensionId) => {
    if (score >= 3.4) {
      return {
        tag: 'Elevado',
        colorClass: dim === 'ANXIETY' ? 'text-amber-700 bg-amber-50' : 'text-emerald-700 bg-emerald-50',
      };
    }
    if (score <= 2.6) {
      return {
        tag: 'Baixo',
        colorClass: dim === 'ANXIETY' ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50',
      };
    }
    return {
      tag: 'Moderado',
      colorClass: 'text-slate-700 bg-slate-100',
    };
  };

  const dimensions: DimensionId[] = ['DEPEND', 'ANXIETY', 'CLOSE'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {dimensions.map((dimKey) => {
        const meta = DIMENSOES_META[dimKey];
        const score = medias[dimKey] ?? 3;
        // Percentage from 1.0 -> 5.0 scale: (score - 1) / 4 * 100
        const percentage = Math.max(0, Math.min(100, ((score - 1) / 4) * 100));
        const level = getLevel(score, dimKey);

        return (
          <div
            key={dimKey}
            className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 leading-snug">
                    {meta.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{meta.subtitle}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${level.colorClass} shrink-0`}
                >
                  {level.tag}
                </span>
              </div>

              {/* Score Display */}
              <div className="flex items-baseline gap-2 my-4">
                <span className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
                  {score.toFixed(2)}
                </span>
                <span className="text-sm text-slate-400 font-mono">/ 5.00</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 mb-4">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: meta.accentHex,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1.0 (Mín)</span>
                  <span>Média Segura: {meta.benchmark}</span>
                  <span>5.0 (Máx)</span>
                </div>
              </div>

              {/* Clinical Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {meta.shortDesc}
              </p>
            </div>

            {/* Raiz de Infância */}
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs">
              <span className="font-semibold text-slate-800 block mb-1">
                Origem na Infância:
              </span>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                {meta.childhoodFocus}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

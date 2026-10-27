import React from 'react';
import { DimensionId, DIMENSOES_META } from '../data/assessmentData';

interface RadarChartProps {
  scores: Record<DimensionId, number>;
  showBenchmark?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores, showBenchmark = true }) => {
  // 3 axes: CLOSE (top-left, 210 deg or 150 deg), DEPEND (top-right, 330 deg or 30 deg), ANXIETY (bottom, 270 deg or 90 deg)
  // Let's position:
  // DEPEND at -30 deg (top-right)
  // CLOSE at -150 deg (top-left)
  // ANXIETY at 90 deg (bottom)
  const size = 320;
  const center = size / 2;
  const radius = 105;
  const levels = [1, 2, 3, 4, 5];

  const axes: { id: DimensionId; label: string; angle: number }[] = [
    { id: 'DEPEND', label: 'Confiança no Suporte', angle: -30 * (Math.PI / 180) },
    { id: 'ANXIETY', label: 'Ansiedade de Abandono', angle: 90 * (Math.PI / 180) },
    { id: 'CLOSE', label: 'Conforto com Intimidade', angle: 210 * (Math.PI / 180) },
  ];

  // Helper to get coordinates
  const getCoordinates = (angle: number, value: number) => {
    // value ranges from 1 to 5. Let normalized = (value) / 5
    const r = (value / 5) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // User polygon points
  const userPoints = axes
    .map((axis) => {
      const score = scores[axis.id] ?? 3;
      const { x, y } = getCoordinates(axis.angle, score);
      return `${x},${y}`;
    })
    .join(' ');

  // Benchmark polygon points (typical secure adult)
  const benchmarkPoints = axes
    .map((axis) => {
      const bench = DIMENSOES_META[axis.id].benchmark;
      const { x, y } = getCoordinates(axis.angle, bench);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible drop-shadow-sm select-none"
          role="img"
          aria-label="Gráfico de Radar das Dimensões de Apego"
        >
          {/* Concentric grid rings */}
          {levels.map((lvl) => {
            const r = (lvl / 5) * radius;
            const points = axes
              .map((axis) => {
                const x = center + r * Math.cos(axis.angle);
                const y = center + r * Math.sin(axis.angle);
                return `${x},${y}`;
              })
              .join(' ');

            return (
              <g key={lvl}>
                <polygon
                  points={points}
                  fill={lvl % 2 === 0 ? '#f8fafc' : '#ffffff'}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                {/* Level indicator on top axis */}
                <text
                  x={center + 5}
                  y={center - r + 3}
                  className="text-[9px] fill-slate-400 font-mono select-none"
                >
                  {lvl}.0
                </text>
              </g>
            );
          })}

          {/* Radial axis spokes */}
          {axes.map((axis) => {
            const endX = center + radius * Math.cos(axis.angle);
            const endY = center + radius * Math.sin(axis.angle);
            return (
              <line
                key={axis.id}
                x1={center}
                y1={center}
                x2={endX}
                y2={endY}
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            );
          })}

          {/* Benchmark polygon */}
          {showBenchmark && (
            <polygon
              points={benchmarkPoints}
              fill="rgba(148, 163, 184, 0.15)"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          )}

          {/* User score polygon */}
          <polygon
            points={userPoints}
            fill="rgba(79, 70, 229, 0.22)"
            stroke="#4f46e5"
            strokeWidth="2.5"
            className="transition-all duration-500 ease-out"
          />

          {/* User score nodes */}
          {axes.map((axis) => {
            const score = scores[axis.id] ?? 3;
            const { x, y } = getCoordinates(axis.angle, score);
            const meta = DIMENSOES_META[axis.id];

            return (
              <g key={axis.id}>
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="#ffffff"
                  stroke="#4f46e5"
                  strokeWidth="2.5"
                  className="transition-all duration-500 ease-out"
                />
              </g>
            );
          })}

          {/* Dimension Labels */}
          {axes.map((axis) => {
            // Push labels outward from radius
            const labelR = radius + 28;
            const lx = center + labelR * Math.cos(axis.angle);
            const ly = center + labelR * Math.sin(axis.angle);
            const meta = DIMENSOES_META[axis.id];
            const score = scores[axis.id];

            return (
              <g key={`lbl-${axis.id}`}>
                <text
                  x={lx}
                  y={ly - 4}
                  textAnchor="middle"
                  className="text-[11px] font-semibold fill-slate-800 tracking-tight"
                >
                  {meta.title}
                </text>
                <text
                  x={lx}
                  y={ly + 9}
                  textAnchor="middle"
                  className="text-[10px] font-mono font-medium fill-indigo-600 tabular-nums"
                >
                  {score.toFixed(2)} / 5.0
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-3 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-indigo-500/25 border border-indigo-600 inline-block" />
          <span className="font-medium text-slate-800">Seu Perfil Atual</span>
        </div>
        {showBenchmark && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0 border-t-2 border-dashed border-slate-400 inline-block" />
            <span className="text-slate-500">Referência Segura Média</span>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { StyleDiagnosis } from '../data/assessmentData';

interface CartesianMatrixProps {
  evasaoX: number; // 1.0 to 5.0
  ansiedadeY: number; // 1.0 to 5.0
  estiloAtivo: StyleDiagnosis['id'];
}

export const CartesianMatrix: React.FC<CartesianMatrixProps> = ({
  evasaoX,
  ansiedadeY,
  estiloAtivo,
}) => {
  // SVG coordinate box 400x340
  const width = 400;
  const height = 340;
  const padding = 45;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;

  // Map 1.0 - 5.0 to inner coordinates
  // X: 1.0 is left, 5.0 is right
  const mapX = (val: number) => padding + ((val - 1) / 4) * innerW;
  // Y: 1.0 is bottom, 5.0 is top (in SVG y=0 is top, so invert)
  const mapY = (val: number) => padding + ((5 - val) / 4) * innerH;

  const posX = mapX(evasaoX);
  const posY = mapY(ansiedadeY);

  const midX = mapX(3.0);
  const midY = mapY(3.0);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-[420px] aspect-[400/340] select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible drop-shadow-sm"
          role="img"
          aria-label="Matriz Bidimensional de Apego Adulto (Modelo de Bartholomew)"
        >
          {/* Quadrant Backgrounds */}
          {/* Top-Left: Ansioso / Preocupado */}
          <rect
            x={padding}
            y={padding}
            width={midX - padding}
            height={midY - padding}
            fill={estiloAtivo === 'ansioso' ? 'rgba(245, 158, 11, 0.12)' : '#fafafa'}
            stroke="#f1f5f9"
            className="transition-colors duration-300"
          />

          {/* Top-Right: Desorganizado / Medroso */}
          <rect
            x={midX}
            y={padding}
            width={width - padding - midX}
            height={midY - padding}
            fill={estiloAtivo === 'desorganizado' ? 'rgba(225, 29, 72, 0.12)' : '#f8fafc'}
            stroke="#f1f5f9"
            className="transition-colors duration-300"
          />

          {/* Bottom-Left: Seguro / Autônomo */}
          <rect
            x={padding}
            y={midY}
            width={midX - padding}
            height={height - padding - midY}
            fill={estiloAtivo === 'seguro' ? 'rgba(16, 185, 129, 0.12)' : '#f8fafc'}
            stroke="#f1f5f9"
            className="transition-colors duration-300"
          />

          {/* Bottom-Right: Evitativo / Dismissive */}
          <rect
            x={midX}
            y={midY}
            width={width - padding - midX}
            height={height - padding - midY}
            fill={estiloAtivo === 'evitativo' ? 'rgba(71, 85, 105, 0.12)' : '#fafafa'}
            stroke="#f1f5f9"
            className="transition-colors duration-300"
          />

          {/* Quadrant Labels */}
          <text
            x={padding + 12}
            y={padding + 22}
            className={`text-[11px] font-semibold ${
              estiloAtivo === 'ansioso' ? 'fill-amber-700' : 'fill-slate-500'
            }`}
          >
            ANSIOSO (Preocupado)
          </text>
          <text
            x={padding + 12}
            y={padding + 36}
            className="text-[9px] fill-slate-400 font-mono"
          >
            Baixa Evasão · Alta Ansiedade
          </text>

          <text
            x={midX + 12}
            y={padding + 22}
            className={`text-[11px] font-semibold ${
              estiloAtivo === 'desorganizado' ? 'fill-rose-700' : 'fill-slate-500'
            }`}
          >
            DESORGANIZADO (Medroso)
          </text>
          <text
            x={midX + 12}
            y={padding + 36}
            className="text-[9px] fill-slate-400 font-mono"
          >
            Alta Evasão · Alta Ansiedade
          </text>

          <text
            x={padding + 12}
            y={midY + 24}
            className={`text-[11px] font-semibold ${
              estiloAtivo === 'seguro' ? 'fill-emerald-700' : 'fill-slate-500'
            }`}
          >
            SEGURO (Autônomo)
          </text>
          <text
            x={padding + 12}
            y={midY + 38}
            className="text-[9px] fill-slate-400 font-mono"
          >
            Baixa Evasão · Baixa Ansiedade
          </text>

          <text
            x={midX + 12}
            y={midY + 24}
            className={`text-[11px] font-semibold ${
              estiloAtivo === 'evitativo' ? 'fill-slate-800' : 'fill-slate-500'
            }`}
          >
            EVITATIVO (Desconectado)
          </text>
          <text
            x={midX + 12}
            y={midY + 38}
            className="text-[9px] fill-slate-400 font-mono"
          >
            Alta Evasão · Baixa Ansiedade
          </text>

          {/* Central Dividing Axes */}
          <line
            x1={midX}
            y1={padding}
            x2={midX}
            y2={height - padding}
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <line
            x1={padding}
            y1={midY}
            x2={width - padding}
            y2={midY}
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Outer Border */}
          <rect
            x={padding}
            y={padding}
            width={innerW}
            height={innerH}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1"
            rx="4"
          />

          {/* Axis Labels */}
          {/* Y-Axis Label (Ansiedade) */}
          <text
            x={padding}
            y={padding - 14}
            textAnchor="start"
            className="text-[11px] font-semibold fill-slate-700 tracking-tight"
          >
            ▲ Ansiedade de Abandono (1.0 → 5.0)
          </text>

          {/* X-Axis Label (Evasão) */}
          <text
            x={width - padding}
            y={height - padding + 24}
            textAnchor="end"
            className="text-[11px] font-semibold fill-slate-700 tracking-tight"
          >
            Evasão da Intimidade (1.0 → 5.0) ▶
          </text>

          {/* Coordinates tick markers */}
          <text x={padding - 8} y={posY + 3} textAnchor="end" className="text-[10px] font-mono fill-indigo-600 font-medium">
            {ansiedadeY.toFixed(2)}
          </text>
          <text x={posX} y={height - padding + 15} textAnchor="middle" className="text-[10px] font-mono fill-indigo-600 font-medium">
            {evasaoX.toFixed(2)}
          </text>

          {/* User Marker crosshairs */}
          <line
            x1={padding}
            y1={posY}
            x2={width - padding}
            y2={posY}
            stroke="#818cf8"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.7"
          />
          <line
            x1={posX}
            y1={padding}
            x2={posX}
            y2={height - padding}
            stroke="#818cf8"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.7"
          />

          {/* User Marker Pulse and Dot */}
          <circle
            cx={posX}
            cy={posY}
            r="12"
            fill="rgba(79, 70, 229, 0.2)"
            className="animate-ping"
          />
          <circle
            cx={posX}
            cy={posY}
            r="7"
            fill="#4f46e5"
            stroke="#ffffff"
            strokeWidth="2.5"
            className="drop-shadow-md"
          />
        </svg>
      </div>

      <div className="flex items-center justify-between w-full max-w-[420px] px-2 text-xs text-slate-500 mt-2 font-mono">
        <span>Evasão: {evasaoX.toFixed(2)}</span>
        <span>·</span>
        <span>Ansiedade: {ansiedadeY.toFixed(2)}</span>
        <span>·</span>
        <span className="font-semibold text-indigo-700">Seu Ponto de Apego</span>
      </div>
    </div>
  );
};

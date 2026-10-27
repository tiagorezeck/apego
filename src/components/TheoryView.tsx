import React from 'react';
import { BookOpen, CheckCircle, ArrowRight, ShieldCheck, Heart, UserCheck } from 'lucide-react';

interface TheoryViewProps {
  onStartTest: () => void;
}

export const TheoryView: React.FC<TheoryViewProps> = ({ onStartTest }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Fundamentação Científica & Psicométrica</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          A Ciência por Trás do Inventário de Apego (36 Itens)
        </h1>
        <p className="text-base text-slate-600 mt-2 max-w-2xl">
          Como os padrões de cuidado recebidos na infância se cristalizam em modelos operacionais internos que governam seus relacionamentos na vida adulta.
        </p>
      </div>

      {/* 3 Core Dimensions Explanation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          As 3 Dimensões Psicométricas do Teste
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Baseadas na clássica Escala de Apego Adulto (Collins e Read, 1990) expandida para 36 itens de alta resolução:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-mono font-bold text-emerald-700 block mb-1">
              01. Confiança no Suporte
            </span>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Confiabilidade e Raiz Protetora
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mede se o indivíduo acredita que os outros estarão disponíveis quando solicitado socorro. Itens analisam se a infância ofereceu pais seguros ou se forçou a criança a se virar sozinha prematuramente.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-mono font-bold text-amber-700 block mb-1">
              02. Ansiedade de Abandono
            </span>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Medo de Rejeição e Hipervigilância
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mede a hipersensibilidade ao distanciamento do parceiro e a necessidade crônica de validação. Raiz em lares com pais imprevisíveis, alternando calor com frieza ou ausência.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-mono font-bold text-indigo-700 block mb-1">
              03. Conforto com Intimidade
            </span>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Vulnerabilidade & Proximidade Afetiva
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Avalia a facilidade em expressar sentimentos genuínos e sustentar contato emocional profundo sem sensação de asfixia ou perda de identidade pessoal.
            </p>
          </div>
        </div>
      </div>

      {/* The 4 Adult Attachment Styles (Bartholomew & Horowitz Model) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Os 4 Estilos de Apego Adulto
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Definidos pela intersecção dos níveis de Ansiedade de Abandono (Modelo de Si) e Evasão da Intimidade (Modelo do Outro):
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-emerald-900">
                1. Estilo Seguro / Autônomo
              </h3>
              <span className="text-[11px] font-mono text-emerald-700">Baixa Ansiedade · Baixa Evasão</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Visão positiva de si mesmo e positiva dos outros. Consegue ser vulnerável, confiar, pedir apoio e sustentar intimidade com tranquilidade e limites saudáveis.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-amber-900">
                2. Estilo Ansioso / Ambivalente
              </h3>
              <span className="text-[11px] font-mono text-amber-700">Alta Ansiedade · Baixa Evasão</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Visão negativa de si mesmo e hiperidealizada do outro. Deseja fusão profunda, teme ser rejeitado a qualquer instante e interpreta qualquer silêncio como abandono iminente.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900">
                3. Estilo Evitativo / Desconectado
              </h3>
              <span className="text-[11px] font-mono text-slate-600">Baixa Ansiedade · Alta Evasão</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Visão positiva/defensiva de si ("eu não preciso de ninguém") e cética em relação aos outros. Reprime a carência afetiva e levanta muralhas de isolamento contra a vulnerabilidade.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-rose-900">
                4. Estilo Desorganizado / Medroso
              </h3>
              <span className="text-[11px] font-mono text-rose-700">Alta Ansiedade · Alta Evasão</span>
            </div>
            <p className="text-xs text-rose-800 leading-relaxed">
              Visão negativa de si e do outro. O dilema trágico da aproximação-fuga: deseja afeto e conexão, mas quando o parceiro se aproxima, é tomado pelo pavor de ser ferido ou subjugado.
            </p>
          </div>
        </div>
      </div>

      {/* Earned Security Concept */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold mb-2">
          O Conceito de "Segurança Adquirida"
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          A neurociência e a psicologia moderna comprovam que o estilo de apego não é uma condenação imutável. Adultos com históricos de apego inseguro (ansioso, evitativo ou desorganizado) podem desenvolver <strong>Apego Seguro Adquirido</strong> através de psicoterapia, reflexão autoconsciente e vínculos afetivos estáveis e reparadores.
        </p>
        <button
          onClick={onStartTest}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <span>Ir para o Questionário</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

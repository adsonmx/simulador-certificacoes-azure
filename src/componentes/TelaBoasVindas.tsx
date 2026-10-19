import React, { useState } from 'react';
import { CATALOGO_CERTIFICACOES } from '../dados/catalogoProvas';
import type { ConfiguracaoSimulado } from '../tipos/simulado';
import { Award, BookOpen, Clock, ShieldCheck } from 'lucide-react';

interface Props {
  aoIniciar: (config: ConfiguracaoSimulado) => void;
}

export const TelaBoasVindas: React.FC<Props> = ({ aoIniciar }) => {
  const [certificacaoId, setCertificacaoId] = useState<string>(CATALOGO_CERTIFICACOES[0].id);
  const [modo, setModo] = useState<'estudo' | 'exame'>('estudo');
  const [tempoMinutos, setTempoMinutos] = useState<number>(30);
  const [quantidadeQuestoes, setQuantidadeQuestoes] = useState<number>(10);

  const provaSelecionada = CATALOGO_CERTIFICACOES.find(c => c.id === certificacaoId);

  const iniciar = () => {
    aoIniciar({
      certificacaoId,
      modo,
      tempoMinutos: modo === 'estudo' ? 0 : tempoMinutos,
      quantidadeQuestoes
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100 shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 flex items-center justify-center gap-3">
          <Award className="w-9 h-9 text-blue-400" />
          Simulador Multi-Certificações Cloud & TI
        </h1>
        <p className="text-slate-400 mt-2">
          Selecione a certificação desejada, configure seu modo de treinamento e teste seus conhecimentos.
        </p>
      </div>

      <div className="space-y-6">
        {/* Seção 1: Seleção de Prova do Catálogo */}
        <div>
          <label className="block text-sm font-semibold mb-3 text-slate-300">
            1. Selecione a Certificação:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CATALOGO_CERTIFICACOES.map((prova) => {
              const selecionada = certificacaoId === prova.id;
              return (
                <button
                  key={prova.id}
                  type="button"
                  onClick={() => setCertificacaoId(prova.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    selecionada
                      ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/20'
                      : 'border-slate-800 bg-slate-800/40 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                      {prova.provedor}
                    </span>
                    <h3 className="font-bold text-lg text-white mt-1">{prova.id}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{prova.nome}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/50 pt-2">
                    <span>Corte: {prova.notaCortePercentual}%</span>
                    <span>Padrão: {prova.tempoPadraoMinutos}m</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Seção 2: Modo de Treinamento */}
        <div>
          <label className="block text-sm font-semibold mb-3 text-slate-300">
            2. Modo de Treinamento:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setModo('estudo')}
              className={`p-4 rounded-xl border text-left flex gap-4 items-start ${
                modo === 'estudo'
                  ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20'
                  : 'border-slate-800 bg-slate-800/40'
              }`}
            >
              <BookOpen className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-white">Modo Estudo</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Sem pressão de tempo. Veja a justificativa técnica oficial logo após responder cada pergunta.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setModo('exame')}
              className={`p-4 rounded-xl border text-left flex gap-4 items-start ${
                modo === 'exame'
                  ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20'
                  : 'border-slate-800 bg-slate-800/40'
              }`}
            >
              <ShieldCheck className="w-6 h-6 text-amber-400 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-white">Modo Exame Real</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Cronômetro contínuo regressivo. Sem feedback imediato; relatório completo exibido apenas no final.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Seção 3: Configuração de Tempo e Questões */}
        {modo === 'exame' && (
          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Tempo Limite:</span>
            </div>
            <select
              value={tempoMinutos}
              onChange={(e) => setTempoMinutos(Number(e.target.value))}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 outline-none"
            >
              <option value={15}>15 Minutos (Simulado Rápido)</option>
              <option value={30}>30 Minutos</option>
              <option value={45}>45 Minutos</option>
              <option value={60}>60 Minutos</option>
              <option value={90}>90 Minutos (Exame Completo)</option>
            </select>
          </div>
        )}

        {/* Botão de Início */}
        <button
          type="button"
          onClick={iniciar}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-lg transition-all shadow-lg shadow-blue-600/30 cursor-pointer mt-4"
        >
          Iniciar Simulado ({provaSelecionada?.id} - {provaSelecionada?.provedor})
        </button>
      </div>
    </div>
  );
};
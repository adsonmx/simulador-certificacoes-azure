import React, { useState, useMemo } from 'react';
import type { RespostaUsuario, ConfiguracaoSimulado, DesempenhoDominio } from '../tipos/simulado';
import { 
  Trophy, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Clock, 
  BookMarked,
  Filter
} from 'lucide-react';

interface PropriedadesRelatorioResultado {
  respostas: RespostaUsuario[];
  configuracao: ConfiguracaoSimulado;
  tempoDecorrido: number;
  aoReiniciar: () => void;
}

type TipoFiltro = 'todos' | 'certos' | 'errados';

export const RelatorioResultado: React.FC<PropriedadesRelatorioResultado> = ({
  respostas,
  tempoDecorrido,
  aoReiniciar,
}) => {
  const [filtroAtivo, setFiltroAtivo] = useState<TipoFiltro>('todos');

  const totalQuestoes = respostas.length;
  const quantidadeAcertos = respostas.filter((item) => item.estaCorreta).length;
  const quantidadeErros = totalQuestoes - quantidadeAcertos;
  const porcentagemNota = Math.round((quantidadeAcertos / totalQuestoes) * 100);
  const aprovado = porcentagemNota >= 70;

  const analisePorDominio: DesempenhoDominio[] = useMemo(() => {
    const mapa: Record<string, { total: number; acertos: number }> = {};

    respostas.forEach(({ questao, estaCorreta }) => {
      if (!mapa[questao.dominio]) {
        mapa[questao.dominio] = { total: 0, acertos: 0 };
      }
      mapa[questao.dominio].total += 1;
      if (estaCorreta) mapa[questao.dominio].acertos += 1;
    });

    return Object.entries(mapa).map(([dominio, valor]) => ({
      dominio,
      total: valor.total,
      acertos: valor.acertos,
      porcentagem: Math.round((valor.acertos / valor.total) * 100),
    }));
  }, [respostas]);

  const dominioMaisFraco = useMemo(() => {
    if (analisePorDominio.length === 0) return null;
    return [...analisePorDominio].sort((a, b) => a.porcentagem - b.porcentagem)[0];
  }, [analisePorDominio]);

  const respostasFiltradas = respostas.filter((item) => {
    if (filtroAtivo === 'certos') return item.estaCorreta;
    if (filtroAtivo === 'errados') return !item.estaCorreta;
    return true;
  });

  const formatarTempo = (totalSegundos: number) => {
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return `${minutos}m ${segundos}s`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        aprovado 
          ? 'bg-emerald-950/20 border-emerald-500/40' 
          : 'bg-rose-950/20 border-rose-500/40'
      } text-center shadow-xl`}>
        <div className="inline-flex p-3 rounded-full mb-3 bg-slate-900 border border-slate-800">
          <Trophy className={`w-8 h-8 ${aprovado ? 'text-emerald-400' : 'text-rose-400'}`} />
        </div>
        
        <h1 className="text-3xl font-extrabold text-white">
          {aprovado ? 'Parabéns! Você foi aprovado!' : 'Ainda não foi dessa vez.'}
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Nota de corte da Microsoft: <strong>70%</strong>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Pontuação</span>
            <div className={`text-2xl font-black ${aprovado ? 'text-emerald-400' : 'text-rose-400'}`}>
              {porcentagemNota}%
            </div>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Acertos</span>
            <div className="text-2xl font-black text-emerald-400">{quantidadeAcertos}/{totalQuestoes}</div>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Erros</span>
            <div className="text-2xl font-black text-rose-400">{quantidadeErros}</div>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Tempo Total</span>
            <div className="text-2xl font-black text-sky-400 flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              {formatarTempo(tempoDecorrido)}
            </div>
          </div>
        </div>
      </div>

      {dominioMaisFraco && (
        <div className="bg-amber-950/20 border border-amber-500/30 p-5 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-amber-300 text-sm sm:text-base">
              Foco Recomendado para Revisão
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Seu menor rendimento foi em <strong className="text-white">{dominioMaisFraco.dominio}</strong> com apenas{' '}
              <strong className="text-amber-300">{dominioMaisFraco.porcentagem}% de acerto</strong> ({dominioMaisFraco.acertos} de {dominioMaisFraco.total}).
            </p>
          </div>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-sky-400" />
          Desempenho por Área de Conhecimento
        </h3>
        <div className="space-y-3">
          {analisePorDominio.map((item) => (
            <div key={item.dominio} className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="font-medium">{item.dominio}</span>
                <span>{item.acertos}/{item.total} ({item.porcentagem}%)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all ${
                    item.porcentagem >= 70 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${item.porcentagem}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Revisão das Questões:
          </span>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFiltroAtivo('todos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex-1 sm:flex-initial cursor-pointer ${
              filtroAtivo === 'todos'
                ? 'bg-sky-500 text-slate-950 shadow'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Todas ({totalQuestoes})
          </button>
          <button
            onClick={() => setFiltroAtivo('certos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex-1 sm:flex-initial cursor-pointer ${
              filtroAtivo === 'certos'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Certas ({quantidadeAcertos})
          </button>
          <button
            onClick={() => setFiltroAtivo('errados')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex-1 sm:flex-initial cursor-pointer ${
              filtroAtivo === 'errados'
                ? 'bg-rose-500 text-slate-950 shadow'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Erradas ({quantidadeErros})
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {respostasFiltradas.map(({ questao, indiceSelecionado, estaCorreta }) => (
          <div
            key={questao.id}
            className={`p-5 rounded-xl border bg-slate-900/60 ${
              estaCorreta ? 'border-emerald-500/30' : 'border-rose-500/30'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-slate-300">Questão #{questao.id}</span>
              <span className="flex items-center gap-1 font-bold">
                {estaCorreta ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Acertou
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Errou
                  </span>
                )}
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-white mb-3">
              {questao.enunciado}
            </h4>

            <div className="space-y-1.5 mb-3">
              {questao.alternativas.map((alternativa, indice) => {
                const foiEscolhida = indiceSelecionado === indice;
                const ehCorreta = indice === questao.indiceCorreto;

                let classeEstilo = 'text-slate-400 bg-slate-950/40 border-slate-800/80';
                if (ehCorreta) {
                  classeEstilo = 'text-emerald-300 bg-emerald-500/10 border-emerald-500/40 font-semibold';
                } else if (foiEscolhida && !ehCorreta) {
                  classeEstilo = 'text-rose-300 bg-rose-500/10 border-rose-500/40 line-through';
                }

                return (
                  <div
                    key={indice}
                    className={`p-2.5 rounded-lg border text-xs sm:text-sm flex items-center justify-between ${classeEstilo}`}
                  >
                    <span>{String.fromCharCode(65 + indice)}) {alternativa}</span>
                    {foiEscolhida && (
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800">
                        Sua resposta
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <strong className="text-sky-400 block mb-0.5">Explicação Oficial:</strong>
              {questao.explicacao}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 text-center">
        <button
          onClick={aoReiniciar}
          className="w-full sm:w-auto px-8 py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-base shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          Fazer Novo Simulado
        </button>
      </div>
    </div>
  );
};
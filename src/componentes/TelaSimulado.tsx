import React, { useState, useEffect } from 'react';
import type { Questao, ConfiguracaoSimulado, RespostaUsuario } from '../tipos/simulado';
import { Clock, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface PropriedadesTelaSimulado {
  questoes: Questao[];
  configuracao: ConfiguracaoSimulado;
  aoFinalizarSimulado: (respostas: RespostaUsuario[], tempoDecorrido: number) => void;
  aoCancelar: () => void;
}

export const TelaSimulado: React.FC<PropriedadesTelaSimulado> = ({
  questoes,
  configuracao,
  aoFinalizarSimulado,
  aoCancelar,
}) => {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);
  const [respostaConfirmada, setRespostaConfirmada] = useState(false);
  const [respostasUsuario, setRespostasUsuario] = useState<RespostaUsuario[]>([]);
  const [segundosRestantes, setSegundosRestantes] = useState<number>(
    configuracao.tempoLimiteMinutos > 0 ? configuracao.tempoLimiteMinutos * 60 : 0
  );
  const [tempoDecorrido, setTempoDecorrido] = useState<number>(0);

  const questaoAtual = questoes[indiceAtual];
  const porcentagemProgresso = questoes.length > 0 ? ((indiceAtual + 1) / questoes.length) * 100 : 0;

  useEffect(() => {
    const temporizador = setInterval(() => {
      setTempoDecorrido((anterior) => anterior + 1);

      if (configuracao.tempoLimiteMinutos > 0) {
        setSegundosRestantes((anterior) => {
          if (anterior <= 1) {
            clearInterval(temporizador);
            aoFinalizarSimulado(respostasUsuario, tempoDecorrido);
            return 0;
          }
          return anterior - 1;
        });
      }
    }, 1000);

    return () => clearInterval(temporizador);
  }, [configuracao.tempoLimiteMinutos, respostasUsuario, tempoDecorrido, aoFinalizarSimulado]);

  const formatarTempo = (totalSegundos: number) => {
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  };

  const selecionarOpcao = (indice: number) => {
    if (configuracao.modo === 'estudo' && respostaConfirmada) return;
    setOpcaoSelecionada(indice);

    if (configuracao.modo === 'estudo') {
      setRespostaConfirmada(true);
    }
  };

  const proximaQuestao = () => {
    if (opcaoSelecionada === null || !questaoAtual) return;

    const indiceGabarito = questaoAtual.indiceCorreto ?? (questaoAtual as any).correctOptionIndex;
    const estaCorreta = opcaoSelecionada === indiceGabarito;
    const respostasAtualizadas: RespostaUsuario[] = [
      ...respostasUsuario,
      { questao: questaoAtual, indiceSelecionado: opcaoSelecionada, estaCorreta },
    ];
    setRespostasUsuario(respostasAtualizadas);

    if (indiceAtual + 1 < questoes.length) {
      setIndiceAtual((anterior) => anterior + 1);
      setOpcaoSelecionada(null);
      setRespostaConfirmada(false);
    } else {
      aoFinalizarSimulado(respostasAtualizadas, tempoDecorrido);
    }
  };

  if (!questaoAtual) {
    return (
      <div className="text-center p-8 text-slate-300">
        Nenhuma questão encontrada para este simulado.
      </div>
    );
  }

  // AQUI É ONDE ENTRA A LINHA: busca 'alternativas' ou 'options' com segurança
  const listaOpcoes: string[] = questaoAtual.alternativas || (questaoAtual as any).options || [];
  const gabarito = questaoAtual.indiceCorreto ?? (questaoAtual as any).correctOptionIndex;
  const textoEnunciado = questaoAtual.enunciado || (questaoAtual as any).prompt;
  const textoExplicacao = questaoAtual.explicacao || (questaoAtual as any).explanation;
  const textoDominio = questaoAtual.dominio || (questaoAtual as any).domain;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Barra de Status */}
      <div className="flex items-center justify-between mb-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-sky-500/20 text-sky-400 border border-sky-500/30">
            {configuracao.certificacao}
          </span>
          <span className="text-xs text-slate-400">
            Modo: <strong className="text-slate-200">{configuracao.modo === 'estudo' ? 'Estudo (Feedback imediato)' : 'Exame Real'}</strong>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm font-mono font-medium text-slate-300">
            <Clock className="w-4 h-4 text-sky-400" />
            {configuracao.tempoLimiteMinutos > 0 ? formatarTempo(segundosRestantes) : formatarTempo(tempoDecorrido)}
          </div>
          <button
            onClick={aoCancelar}
            title="Abandonar simulado"
            className="text-slate-400 hover:text-rose-400 transition-colors p-1 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="w-full bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className="bg-sky-500 h-2 transition-all duration-300 rounded-full"
          style={{ width: `${porcentagemProgresso}%` }}
        />
      </div>

      {/* Cartão da Questão */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
          <span>Questão {indiceAtual + 1} de {questoes.length}</span>
          <span className="text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded border border-sky-400/20">
            {textoDominio}
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-white mb-6 leading-relaxed">
          {textoEnunciado}
        </h2>

        {/* Lista de Alternativas usando a variável listaOpcoes */}
        <div className="space-y-3">
          {listaOpcoes.map((alternativa, indice) => {
            const estaSelecionada = opcaoSelecionada === indice;
            const ehACorreta = indice === gabarito;

            let estiloBotao = 'border-slate-800 bg-slate-800/40 hover:border-slate-700 text-slate-200';

            if (configuracao.modo === 'estudo' && respostaConfirmada) {
              if (ehACorreta) {
                estiloBotao = 'border-emerald-500 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500';
              } else if (estaSelecionada && !ehACorreta) {
                estiloBotao = 'border-rose-500 bg-rose-500/10 text-rose-300 ring-1 ring-rose-500';
              } else {
                estiloBotao = 'border-slate-800/50 bg-slate-900/40 text-slate-500 opacity-60';
              }
            } else if (estaSelecionada) {
              estiloBotao = 'border-sky-500 bg-sky-500/10 text-white ring-1 ring-sky-500';
            }

            return (
              <button
                key={indice}
                type="button"
                onClick={() => selecionarOpcao(indice)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${estiloBotao}`}
              >
                <div className="mt-0.5 font-bold text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                  {String.fromCharCode(65 + indice)}
                </div>
                <div className="flex-1 text-sm sm:text-base leading-snug">{alternativa}</div>

                {configuracao.modo === 'estudo' && respostaConfirmada && (
                  <div>
                    {ehACorreta && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    {estaSelecionada && !ehACorreta && <XCircle className="w-5 h-5 text-rose-400" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Justificativa Técnica no Modo Estudo */}
        {configuracao.modo === 'estudo' && respostaConfirmada && (
          <div className="mt-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-1 flex items-center gap-1.5">
              💡 Justificativa Técnica
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {textoExplicacao}
            </p>
          </div>
        )}

        {/* Botão de Avançar */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            disabled={opcaoSelecionada === null}
            onClick={proximaQuestao}
            className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
              opcaoSelecionada === null
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/20 cursor-pointer'
            }`}
          >
            {indiceAtual + 1 === questoes.length ? 'Finalizar Simulado' : 'Próxima Questão'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import type { IdCertificacao, ConfiguracaoSimulado, ModoSimulado } from '../tipos/simulado';
import { Award, BookOpen, Clock, ShieldCheck, Zap } from 'lucide-react';

interface PropriedadesTelaBoasVindas {
  aoIniciarSimulado: (configuracao: ConfiguracaoSimulado) => void;
  quantidadeQuestoesDisponiveis: number;
}

const opcoesCertificacao: { id: IdCertificacao; titulo: string; descricao: string; disponivel: boolean }[] = [
  { id: 'AZ-900', titulo: 'Microsoft Azure Fundamentals', descricao: 'Conceitos gerais, arquitetura e governança de nuvem', disponivel: true },
  { id: 'AZ-104', titulo: 'Azure Administrator Associate', descricao: 'Gerenciamento de identidades, governança, storage e rede', disponivel: true },
  { id: 'AZ-204', titulo: 'Azure Developer Associate', descricao: 'Desenvolvimento de soluções PaaS e serverless', disponivel: false },
  { id: 'AZ-400', titulo: 'DevOps Engineer Expert', descricao: 'Esteiras CI/CD, automação e observabilidade', disponivel: false },
];

export const TelaBoasVindas: React.FC<PropriedadesTelaBoasVindas> = ({
  aoIniciarSimulado,
  quantidadeQuestoesDisponiveis,
}) => {
  const [certificacaoSelecionada, setCertificacaoSelecionada] = useState<IdCertificacao>('AZ-900');
  const [modo, setModo] = useState<ModoSimulado>('estudo');
  const [tempoLimite, setTempoLimite] = useState<number>(30);
  const [quantidadeQuestoes, setQuantidadeQuestoes] = useState<number>(Math.min(8, quantidadeQuestoesDisponiveis));

  const iniciar = () => {
    aoIniciarSimulado({
      certificacao: certificacaoSelecionada,
      modo,
      tempoLimiteMinutos: tempoLimite,
      quantidadeQuestoes,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-3">
          <ShieldCheck className="w-4 h-4" />
          Simulador Oficial de Certificações Cloud
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Prepare-se para o seu exame <span className="text-sky-400">Microsoft Azure</span>
        </h1>
        <p className="mt-2 text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
          Configure seu simulado escolhendo o exame, o formato de feedback e o tempo limite.
        </p>
      </header>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm space-y-8">
        <section>
          <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">
            1. Selecione o Exame
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {opcoesCertificacao.map((item) => {
              const estaSelecionado = certificacaoSelecionada === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={!item.disponivel}
                  onClick={() => setCertificacaoSelecionada(item.id)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    !item.disponivel
                      ? 'border-slate-800 bg-slate-950/40 opacity-50 cursor-not-allowed'
                      : estaSelecionado
                      ? 'border-sky-500 bg-sky-500/10 text-white shadow-sm ring-1 ring-sky-500'
                      : 'border-slate-800 bg-slate-800/40 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-lg text-white flex items-center gap-2">
                      <Award className={`w-5 h-5 ${estaSelecionado ? 'text-sky-400' : 'text-slate-400'}`} />
                      {item.id}
                    </span>
                    {item.disponivel ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                        Ativo
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        Em breve
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-slate-200">{item.titulo}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-1">{item.descricao}</div>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">
            2. Modo de Avaliação
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setModo('estudo')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                modo === 'estudo'
                  ? 'border-sky-500 bg-sky-500/10 text-white ring-1 ring-sky-500'
                  : 'border-slate-800 bg-slate-800/40 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-white mb-1">
                <BookOpen className="w-5 h-5 text-sky-400" />
                Modo Estudo (Imediato)
              </div>
              <p className="text-xs text-slate-400">
                Veja na hora se acertou ou errou, com explicação técnica detalhada a cada questão marcada.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setModo('exame')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                modo === 'exame'
                  ? 'border-sky-500 bg-sky-500/10 text-white ring-1 ring-sky-500'
                  : 'border-slate-800 bg-slate-800/40 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-white mb-1">
                <Zap className="w-5 h-5 text-amber-400" />
                Modo Exame Real
              </div>
              <p className="text-xs text-slate-400">
                Simula o ambiente de prova da Microsoft: cronômetro contínuo e feedback/análise de fraquezas somente ao final.
              </p>
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-sky-400" /> Tempo Limite
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[20, 30, 40, 0].map((minutos) => (
                <button
                  key={minutos}
                  type="button"
                  onClick={() => setTempoLimite(minutos)}
                  className={`py-2 text-center rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                    tempoLimite === minutos
                      ? 'border-sky-500 bg-sky-500/20 text-white font-bold'
                      : 'border-slate-800 bg-slate-800/40 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  {minutos === 0 ? 'Livre' : `${minutos}m`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2 uppercase tracking-wider">
              Quantidade de Questões
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[4, 6, quantidadeQuestoesDisponiveis].map((quantidade) => (
                <button
                  key={quantidade}
                  type="button"
                  onClick={() => setQuantidadeQuestoes(quantidade)}
                  className={`py-2 text-center rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                    quantidadeQuestoes === quantidade
                      ? 'border-sky-500 bg-sky-500/20 text-white font-bold'
                      : 'border-slate-800 bg-slate-800/40 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  {quantidade} questões
                </button>
              ))}
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={iniciar}
          className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-lg shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          Iniciar Simulado ({certificacaoSelecionada})
        </button>
      </div>
    </div>
  );
};
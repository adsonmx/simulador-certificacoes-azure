export type IdCertificacao = 'AZ-900' | 'AZ-104' | 'AZ-204' | 'AZ-205' | 'AZ-400';

export type ModoSimulado = 'estudo' | 'exame';

export interface Questao {
  id: number;
  certificacao: IdCertificacao;
  dominio: string;
  enunciado: string;
  alternativas: string[];
  indiceCorreto: number;
  explicacao: string;
}

export interface ConfiguracaoSimulado {
  certificacao: IdCertificacao;
  modo: ModoSimulado;
  quantidadeQuestoes: number;
  tempoLimiteMinutos: number;
}

export interface RespostaUsuario {
  questao: Questao;
  indiceSelecionado: number;
  estaCorreta: boolean;
}

export interface DesempenhoDominio {
  dominio: string;
  total: number;
  acertos: number;
  porcentagem: number;
}
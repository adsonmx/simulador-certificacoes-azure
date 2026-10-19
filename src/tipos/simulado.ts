export type CategoriaCertificacao = 'Cloud' | 'Seguranca' | 'Redes' | 'Gestao';

export interface MetadadosCertificacao {
  id: string;                      // Ex: 'AZ-900', 'AZ-104', 'AWS-CLF'
  nome: string;                    // Nome oficial
  provedor: string;                // Ex: 'Microsoft Azure', 'Amazon Web Services'
  categoria: CategoriaCertificacao;
  tempoPadraoMinutos: number;      // Tempo sugerido de prova
  notaCortePercentual: number;     // Ex: 70
  descricaoBreve: string;
}

export interface Questao {
  id: number;
  certificacao: string;
  dominio: string;
  enunciado: string;
  alternativas: string[];
  indiceCorreto: number;
  explicacao: string;
}

export interface ConfiguracaoSimulado {
  certificacaoId: string;
  modo: 'estudo' | 'exame';
  tempoMinutos: number; // 0 para sem limite
  quantidadeQuestoes: number;
}

export interface RespostaUsuario {
  questao: Questao;
  indiceSelecionado: number | null;
  estaCorreta: boolean;
}

export interface ResultadoFinal {
  totalQuestoes: number;
  acertos: number;
  porcentagem: number;
  aprovado: boolean;
  notaCorteExigida: number;
  desempenhoPorDominio: Record<string, { total: number; acertos: number }>;
  dominioMaisFraco: string;
}
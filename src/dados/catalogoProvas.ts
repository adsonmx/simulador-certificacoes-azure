import az900 from './az900.json';
import az104 from './az104.json';
import awsClf from './aws/clf-c02.json';
import type { MetadadosCertificacao, Questao } from '../tipos/simulado';

export const CATALOGO_CERTIFICACOES: MetadadosCertificacao[] = [
  {
    id: 'AZ-900',
    nome: 'Microsoft Azure Fundamentals',
    provedor: 'Microsoft Azure',
    categoria: 'Cloud',
    tempoPadraoMinutos: 45,
    notaCortePercentual: 70,
    descricaoBreve: 'Conceitos fundamentais de nuvem, arquitetura, serviços centrais da Azure, governança e conformidade.'
  },
  {
    id: 'AZ-104',
    nome: 'Microsoft Azure Administrator',
    provedor: 'Microsoft Azure',
    categoria: 'Cloud',
    tempoPadraoMinutos: 100,
    notaCortePercentual: 70,
    descricaoBreve: 'Implementação, gerenciamento e monitoramento de identidades, governança, armazenamento, computação e redes virtuais.'
  },
  {
    id: 'AWS-CLF',
    nome: 'AWS Certified Cloud Practitioner (CLF-C02)',
    provedor: 'Amazon Web Services',
    categoria: 'Cloud',
    tempoPadraoMinutos: 90,
    notaCortePercentual: 70,
    descricaoBreve: 'Visão geral abrangente sobre conceitos de computação em nuvem AWS, serviços centrais, segurança e modelos de cobrança.'
  }
];

// Dicionário de questões carregadas
export const BANCO_DE_QUESTOES: Record<string, Questao[]> = {
  'AZ-900': az900 as Questao[],
  'AZ-104': az104 as Questao[],
  'AWS-CLF': awsClf as Questao[]
};

// Função utilitária para obter dados da prova selecionada
export function obterDadosCertificacao(id: string): MetadadosCertificacao | undefined {
  return CATALOGO_CERTIFICACOES.find(c => c.id === id);
}

// Função utilitária para buscar questões de qualquer prova
export function carregarQuestoesPorCertificacao(id: string): Questao[] {
  return BANCO_DE_QUESTOES[id] || [];
}
import dadosAz900 from './az900.json';
import type { Questao, IdCertificacao } from '../tipos/simulado';

const listaAz900 = dadosAz900 as Questao[];

export const obterQuestoesPorCertificacao = (certificacao: IdCertificacao): Questao[] => {
  switch (certificacao) {
    case 'AZ-900':
      return listaAz900;
    case 'AZ-104':
      return [];
    default:
      return [];
  }
};
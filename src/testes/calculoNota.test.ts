import { describe, it, expect } from 'vitest';
import type { RespostaUsuario, Questao } from '../tipos/simulado';

// Função pura que calcula o resultado (mesma regra do RelatorioResultado)
export function calcularResultado(respostas: RespostaUsuario[]) {
  const total = respostas.length;
  const acertos = respostas.filter((r) => r.estaCorreta).length;
  const erros = total - acertos;
  const porcentagem = Math.round((acertos / total) * 100);
  const aprovado = porcentagem >= 70; // 70% corte Microsoft

  return { total, acertos, erros, porcentagem, aprovado };
}

describe('Regras de Negócio do Simulado Azure', () => {
  const questaoMock: Questao = {
    id: 1,
    certificacao: 'AZ-900',
    dominio: 'Conceitos de Nuvem',
    enunciado: 'Teste?',
    alternativas: ['A', 'B', 'C', 'D'],
    indiceCorreto: 0,
    explicacao: 'Explicacao teste'
  };

  it('deve aprovar o candidato se a nota for maior ou igual a 70%', () => {
    // 7 acertos de 10 = 70%
    const respostas: RespostaUsuario[] = Array(7).fill({
      questao: questaoMock,
      indiceSelecionado: 0,
      estaCorreta: true
    }).concat(Array(3).fill({
      questao: questaoMock,
      indiceSelecionado: 1,
      estaCorreta: false
    }));

    const resultado = calcularResultado(respostas);
    expect(resultado.porcentagem).toBe(70);
    expect(resultado.aprovado).toBe(true);
    expect(resultado.acertos).toBe(7);
    expect(resultado.erros).toBe(3);
  });

  it('deve reprovar o candidato se a nota for inferior a 70%', () => {
    // 5 acertos de 10 = 50%
    const respostas: RespostaUsuario[] = Array(5).fill({
      questao: questaoMock,
      indiceSelecionado: 0,
      estaCorreta: true
    }).concat(Array(5).fill({
      questao: questaoMock,
      indiceSelecionado: 1,
      estaCorreta: false
    }));

    const resultado = calcularResultado(respostas);
    expect(resultado.porcentagem).toBe(50);
    expect(resultado.aprovado).toBe(false);
  });
});
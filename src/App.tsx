import { useState } from 'react';
import { TelaBoasVindas } from './componentes/TelaBoasVindas';
import { TelaSimulado } from './componentes/TelaSimulado';
import { RelatorioResultado } from './componentes/RelatorioResultado';
import { carregarQuestoesPorCertificacao, obterDadosCertificacao } from './dados/catalogoProvas';
import type { ConfiguracaoSimulado, Questao, RespostaUsuario } from './tipos/simulado';

export default function App() {
  const [etapa, setEtapa] = useState<'inicio' | 'simulado' | 'resultado'>('inicio');
  const [configuracao, setConfiguracao] = useState<ConfiguracaoSimulado | null>(null);
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [respostas, setRespostas] = useState<RespostaUsuario[]>([]);

  // Disparado quando o candidato clica em "Iniciar Simulado"
  const iniciarSimulado = (config: ConfiguracaoSimulado) => {
    const todasQuestoes = carregarQuestoesPorCertificacao(config.certificacaoId);
    
    // Embaralha e seleciona a quantidade desejada
    const questoesEmbaralhadas = [...todasQuestoes].sort(() => Math.random() - 0.5);
    const questoesSelecionadas = questoesEmbaralhadas.slice(
      0,
      config.quantidadeQuestoes && config.quantidadeQuestoes < todasQuestoes.length
        ? config.quantidadeQuestoes
        : todasQuestoes.length
    );

    setConfiguracao(config);
    setQuestoes(questoesSelecionadas);
    setRespostas([]);
    setEtapa('simulado');
  };

  // Disparado ao concluir a última questão ou quando o cronômetro esgota
  const finalizarSimulado = (respostasUsuario: RespostaUsuario[]) => {
    setRespostas(respostasUsuario);
    setEtapa('resultado');
  };

  // Reinicia para a tela de seleção de provas
  const reiniciar = () => {
    setEtapa('inicio');
    setConfiguracao(null);
    setQuestoes([]);
    setRespostas([]);
  };

  const dadosCertificacao = configuracao ? obterDadosCertificacao(configuracao.certificacaoId) : undefined;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-10 px-4">
      {etapa === 'inicio' && (
        <TelaBoasVindas aoIniciar={iniciarSimulado} />
      )}

      {etapa === 'simulado' && configuracao && (
        <TelaSimulado
          questoes={questoes}
          configuracao={configuracao}
          aoFinalizar={finalizarSimulado}
        />
      )}

      {etapa === 'resultado' && configuracao && (
        <RelatorioResultado
          respostas={respostas}
          notaCorteExigida={dadosCertificacao?.notaCortePercentual || 70}
          aoReiniciar={reiniciar}
        />
      )}
    </main>
  );
}
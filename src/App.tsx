import { useState } from 'react';
import { TelaBoasVindas } from './componentes/TelaBoasVindas';
import { TelaSimulado } from './componentes/TelaSimulado';
import { RelatorioResultado } from './componentes/RelatorioResultado';
import type { ConfiguracaoSimulado, Questao, RespostaUsuario } from './tipos/simulado';
import { obterQuestoesPorCertificacao } from './dados/index';

export default function App() {
  const [configuracao, setConfiguracao] = useState<ConfiguracaoSimulado | null>(null);
  const [questoesAtivas, setQuestoesAtivas] = useState<Questao[]>([]);
  const [respostasFinais, setRespostasFinais] = useState<RespostaUsuario[] | null>(null);
  const [tempoDecorridoTotal, setTempoDecorridoTotal] = useState<number>(0);

  const questoesIniciais = obterQuestoesPorCertificacao('AZ-900');

  const iniciarSimulado = (novaConfiguracao: ConfiguracaoSimulado) => {
    const todas = obterQuestoesPorCertificacao(novaConfiguracao.certificacao);
    const selecionadas = todas.slice(0, novaConfiguracao.quantidadeQuestoes);
    setQuestoesAtivas(selecionadas);
    setConfiguracao(novaConfiguracao);
    setRespostasFinais(null);
    setTempoDecorridoTotal(0);
  };

  const finalizarSimulado = (respostas: RespostaUsuario[], tempoGasto: number) => {
    setRespostasFinais(respostas);
    setTempoDecorridoTotal(tempoGasto);
  };

  const reiniciar = () => {
    setConfiguracao(null);
    setRespostasFinais(null);
    setTempoDecorridoTotal(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-6">
      {!configuracao && (
        <TelaBoasVindas
          aoIniciarSimulado={iniciarSimulado}
          quantidadeQuestoesDisponiveis={questoesIniciais.length}
        />
      )}

      {configuracao && !respostasFinais && (
        <TelaSimulado
          questoes={questoesAtivas}
          configuracao={configuracao}
          aoFinalizarSimulado={finalizarSimulado}
          aoCancelar={reiniciar}
        />
      )}

      {configuracao && respostasFinais && (
        <RelatorioResultado
          respostas={respostasFinais}
          configuracao={configuracao}
          tempoDecorrido={tempoDecorridoTotal}
          aoReiniciar={reiniciar}
        />
      )}
    </div>
  );
}
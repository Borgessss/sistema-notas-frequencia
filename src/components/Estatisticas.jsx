import React from 'react';

export default function Estatisticas({ alunos }) {
  if (alunos.length === 0) return null;

  const numDisciplinas = 5;
  
  // Cálculo das médias
  const mediasDisciplinas = Array(numDisciplinas).fill(0);
  alunos.forEach(aluno => {
    aluno.notas.forEach((nota, i) => {
      mediasDisciplinas[i] += nota;
    });
  });
  
  const mediaTurmaPorDisciplina = mediasDisciplinas.map(soma => (soma / alunos.length).toFixed(1));
  const mediaTurmaGeral = (alunos.reduce((acc, a) => acc + (a.notas.reduce((s, n) => s + n, 0) / numDisciplinas), 0) / alunos.length).toFixed(1);
  
  // Alunos com média acima da média da turma
  const acimaMedia = alunos.filter(a => {
    const mediaAluno = a.notas.reduce((s, n) => s + n, 0) / numDisciplinas;
    return mediaAluno > mediaTurmaGeral;
  });
  
  // Alunos com frequência baixa
  const frequenciaBaixa = alunos.filter(a => a.frequencia < 75);

  // Função para exportar dados
  const exportarDados = () => {
    const dadosCompletos = {
      alunos,
      estatisticas: {
        mediaTurmaPorDisciplina,
        mediaTurmaGeral,
        acimaMedia: acimaMedia.map(a => a.nome),
        frequenciaBaixa: frequenciaBaixa.map(a => a.nome)
      },
      dataExportacao: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dadosCompletos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dados-alunos-${new Date().toLocaleDateString('pt-BR')}.json`;
    a.click();
  };

  return (
    <div className="stats-container">
      <h2 className="stats-title">Estatísticas da Turma</h2>
      
      <div className="stats-grid">
        <div className="stats-card">
          <h3>Desempenho por Disciplina</h3>
          <ul className="stats-list">
            {mediaTurmaPorDisciplina.map((m, i) => (
              <li key={i}>
                <span>Disciplina {i+1}:</span>
                <span className="media-value">{m}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="stats-card">
          <h3>Média Geral da Turma: <span>{mediaTurmaGeral}</span></h3>
          
          <h4>Alunos Destaque ({acimaMedia.length})</h4>
          {acimaMedia.length > 0 ? (
            <ul className="alunos-list">
              {acimaMedia.map(a => (
                <li key={a.nome}>
                  <span>{a.nome} </span>
                  <span className="media-alta">
                    {(a.notas.reduce((s, n) => s + n, 0) / numDisciplinas).toFixed(1)}
                  </span>
                </li>
              ))}
            </ul>
          ) : <p className="nenhum-registro">Nenhum aluno acima da média</p>}
        </div>
        
        <div className="stats-card">
          <h3>Atenção Necessária</h3>
          <h4>Frequência Baixa ({frequenciaBaixa.length})</h4>
          {frequenciaBaixa.length > 0 ? (
            <ul className="alunos-list">
              {frequenciaBaixa.map(a => (
                <li key={a.nome}>
                  <span>{a.nome} </span>
                  <span className="frequencia-baixa">{a.frequencia}%</span>
                </li>
              ))}
            </ul>
          ) : <p className="nenhum-registro">Todos com frequência adequada</p>}
        </div>
      </div>
    </div>
  );
}
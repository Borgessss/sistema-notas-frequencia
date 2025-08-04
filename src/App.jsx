import React, { useState, useEffect } from 'react';
import AlunoForm from './components/AlunoForm';
import ListaAlunos from './components/ListaAlunos';
import Estatisticas from './components/Estatisticas';
import './styles/global.css';

export default function App() {
  // Carrega dados do localStorage ao iniciar
  const [alunos, setAlunos] = useState(() => {
    const saved = localStorage.getItem('alunos');
    return saved ? JSON.parse(saved) : [];
  });

  // Salva dados no localStorage sempre que houver mudança
  useEffect(() => {
    localStorage.setItem('alunos', JSON.stringify(alunos));
  }, [alunos]);

  const adicionarAluno = (aluno) => {
    setAlunos([...alunos, aluno]);
  };

  const limparDados = () => {
    if (window.confirm('Tem certeza que deseja apagar TODOS os dados permanentemente?')) {
      setAlunos([]);
      localStorage.removeItem('alunos');
    }
  };

  const handleEditAluno = (alunoEditado) => {
    setAlunos(alunos.map(a => 
      a.nome === alunoEditado.nome ? alunoEditado : a
    ));
  };

  const handleDeleteAluno = (aluno) => {
    setAlunos(alunos.filter(a => a.nome !== aluno.nome));
  };

  return (
    <div className="app-container">
      {/* Coluna do formulário - Largura fixa */}
      <div className="form-column">
        <h1 className="title">Controle de Alunos</h1>
        <AlunoForm onAdicionar={adicionarAluno} />
        <button 
          onClick={limparDados} 
          className="form-button clear-button"
          disabled={alunos.length === 0}
          style={{ marginTop: '1rem' }}
        >
          Limpar Todos os Dados
        </button>
      </div>

      {/* Coluna de dados - Espaço flexível */}
      <div className="data-column">
        <div className="aluno-list">
          <ListaAlunos 
          alunos={alunos} 
          onEdit={handleEditAluno}
          onDelete={handleDeleteAluno} />
        </div>
        <div className="stats-container">
          <Estatisticas alunos={alunos} />
        </div>
      </div>
    </div>
  );
}
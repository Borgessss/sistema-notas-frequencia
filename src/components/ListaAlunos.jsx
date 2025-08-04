import React, { useState } from 'react';
import AlunoModal from './AlunoModal';

export default function ListaAlunos({ alunos, onEdit, onDelete }) {
  const [selectedAluno, setSelectedAluno] = useState(null);

  const handleSave = (alunoEditado) => {
    onEdit(alunoEditado);
    setSelectedAluno(null);
  };

  const handleDelete = (aluno) => {
    onDelete(aluno);
    setSelectedAluno(null);
  };

  return (
    <div className="aluno-list">
      <h2 className="subtitle">Lista de Alunos</h2>
      {alunos.length === 0 ? (
        <p className="nenhum-registro">Nenhum aluno adicionado.</p>
      ) : (
        <ul>
          {alunos.map((aluno, idx) => (
            <li 
              key={idx} 
              className="aluno-item"
              onClick={() => setSelectedAluno(aluno)}
            >
              <div className="aluno-header">
                <strong>{aluno.nome}</strong>
                <span className="aluno-media">
                  Média: {(aluno.notas.reduce((s, n) => s + n, 0) / 5).toFixed(1)}
                </span>
              </div>
              <div className="aluno-details">
                <span>Frequência: </span>
                <span className={aluno.frequencia < 75 ? 'frequencia-baixa' : 'frequencia-ok'}>
                  {aluno.frequencia}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedAluno && (
        <AlunoModal
          aluno={selectedAluno}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setSelectedAluno(null)}
        />
      )}
    </div>
  );
}
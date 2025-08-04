import React, { useState } from 'react';

export default function AlunoModal({ aluno, onSave, onDelete, onClose }) {
  const [editAluno, setEditAluno] = useState({ ...aluno });
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    let numericValue = value === '' ? '' : Number(value);

    // Validação para notas (0-10)
    if (name === 'notas') {
      if (numericValue > 10) numericValue = 10;
      if (numericValue < 0) numericValue = 0;
      
      const novasNotas = [...editAluno.notas];
      novasNotas[index] = numericValue;
      setEditAluno({ ...editAluno, notas: novasNotas });
    } 
    // Validação para frequência (0-100)
    else if (name === 'frequencia') {
      if (numericValue > 100) numericValue = 100;
      if (numericValue < 0) numericValue = 0;
      setEditAluno({ ...editAluno, [name]: numericValue });
    }
  };

  const handleSave = () => {
    // Verificação final antes de salvar
    const notasValidas = editAluno.notas.every(nota => nota >= 0 && nota <= 10);
    const frequenciaValida = editAluno.frequencia >= 0 && editAluno.frequencia <= 100;

    if (!notasValidas || !frequenciaValida) {
      alert('Valores inválidos:\nNotas devem ser entre 0 e 10\nFrequência entre 0% e 100%');
      return;
    }

    onSave(editAluno);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Editar Notas de {editAluno.nome}</h2>

        <div className="form-group">
          <label>Notas</label>
          {editAluno.notas.map((nota, i) => (
            <div key={i} className="nota-input">
              <span>Disciplina {i + 1}:</span>
              <input
                type="number"
                name="notas"
                value={nota}
                onChange={(e) => handleChange(e, i)}
                min="0"
                max="10"
                step="0.1"
                className="form-input small"
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Frequência (%)</label>
          <input
            type="number"
            name="frequencia"
            value={editAluno.frequencia}
            onChange={(e) => handleChange(e)}
            min="0"
            max="100"
            step="0.1"
            className="form-input"
          />
        </div>

        <div className="modal-actions">
          <button 
            onClick={handleSave} 
            className="modal-btn save-btn"
          >
            Salvar Alterações
          </button>
          
          {showConfirm ? (
            <div className="confirm-delete">
              <p>Tem certeza que deseja excluir?</p>
              <div>
                <button 
                  onClick={() => onDelete(aluno)}
                  className="modal-btn delete-confirm-btn"
                >
                  Sim, Excluir
                </button>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="modal-btn cancel-btn"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowConfirm(true)}
              className="modal-btn delete-btn"
            >
              Excluir Aluno
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
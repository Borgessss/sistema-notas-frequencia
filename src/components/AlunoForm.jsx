import React, { useState } from 'react';

export default function AlunoForm({ onAdicionar }) {
  const [nome, setNome] = useState('');
  const [notas, setNotas] = useState(['', '', '', '', '']);
  const [frequencia, setFrequencia] = useState('');
  const [erros, setErros] = useState({});

  const validar = () => {
    const novosErros = {};
    
    if (!nome.trim()) novosErros.nome = 'Nome é obrigatório';
    
    notas.forEach((nota, i) => {
      if (!nota) {
        novosErros[`nota${i}`] = 'Nota é obrigatória';
      } else if (nota < 0 || nota > 10) {
        novosErros[`nota${i}`] = 'Nota deve ser entre 0 e 10';
      }
    });
    
    if (!frequencia) {
      novosErros.frequencia = 'Frequência é obrigatória';
    } else if (frequencia < 0 || frequencia > 100) {
      novosErros.frequencia = 'Frequência deve ser entre 0% e 100%';
    }
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleNotaChange = (index, value) => {
    const numValue = value === '' ? '' : Math.min(10, Math.max(0, parseFloat(value) || 0));
    const novasNotas = [...notas];
    novasNotas[index] = numValue;
    setNotas(novasNotas);
  };

  const handleFrequenciaChange = (value) => {
    const numValue = value === '' ? '' : Math.min(100, Math.max(0, parseFloat(value) || 0));
    setFrequencia(numValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      const aluno = {
        nome,
        notas: notas.map(n => parseFloat(n)),
        frequencia: parseFloat(frequencia)
      };
      onAdicionar(aluno);
      setNome('');
      setNotas(['', '', '', '', '']);
      setFrequencia('');
      setErros({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <div>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do aluno"
          className="form-input"
        />
        {erros.nome && <span className="erro">{erros.nome}</span>}
      </div>
      
      {notas.map((nota, i) => (
        <div key={i}>
          <input
            type="number"
            value={nota}
            onChange={(e) => handleNotaChange(i, e.target.value)}
            placeholder={`Nota ${i + 1}`}
            className="form-input"
            min="0" max="10" step="0.1"
          />
          {erros[`nota${i}`] && <span className="erro">{erros[`nota${i}`]}</span>}
        </div>
      ))}
      
      <div>
        <input
          type="number"
          value={frequencia}
          onChange={(e) => handleFrequenciaChange(e.target.value)}
          placeholder="Frequência (%)"
          className="form-input"
          min="0" max="100" step="0.1"
        />
        {erros.frequencia && <span className="erro">{erros.frequencia}</span>}
      </div>
      
      <button type="submit" className="form-button">Adicionar</button>
    </form>
  );
}
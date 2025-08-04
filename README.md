# Sistema de Gestão de Notas e Frequência Escolar

Sistema desenvolvido para professores gerenciarem notas e frequência de alunos, com:

- Cadastro de alunos e notas  
- Cálculo automático de médias  
- Identificação de alunos com baixo desempenho  
- Persistência de dados no navegador  

## Problema
Carlos é um professor que precisa organizar as notas
e a frequência de seus alunos. Cada aluno tem uma
nota para cada uma das cinco disciplinas que Carlos
ensina e um registro de presença para cada aula.

Crie um sistema onde Carlos possa inserir as notas
de cada aluno (0 a 10) nas cinco disciplinas e a
frequência de cada aluno em percentual (0 a 100%). O
sistema deve calcular automaticamente a média das
notas de cada aluno, a média da turma em cada
disciplina e a frequência geral de cada aluno.

Além disso, o sistema deve permitir que Carlos veja
quais alunos têm uma média de notas acima da
média da turma e quais alunos têm uma frequência
abaixo de 75%, pois esses alunos precisam de atenção
especial.

## Como Executar

### Pré-requisitos

- Node.js (v16 ou superior)  
- NPM (v8 ou superior)  
### Instalação

git clone [https://github.com/Borgessss/sistema-notas-frequencia]
cd sistema-notas-frequencia  
npm install

### Execução

npm run dev

## Premissas e Decisões de Projeto

### Premissas Assumidas

**Dados do Aluno:**

- 5 disciplinas fixas
- Notas de 0 a 10
- Frequência de 0% a 100% 

**Regras de Negócio:**

- Alunos com frequência inferior a 75% precisam de atenção  
- Média calculada por disciplina e média geral  

**Técnicas Utilizadas:**

- Persistência de dados via `localStorage`  
- Sem autenticação (uso local)  

---

### Decisões Técnicas

| Decisão                     | Justificativa                     |
|----------------------------|------------------------------------|
| React + Vite               | Performance e simplicidade         |
| CSS puro                   | Controle total dos estilos         |
| Arquitetura de componentes | Reutilização e facilidade de manutenção |
| Modal de edição            | Experiência de usuário intuitiva   |
| Exportação JSON            | Backup manual dos dados            |

## Funcionalidades Principais

### CRUD Completo

- Adicionar, editar e remover alunos  
- Validação de campos obrigatórios  

### Estatísticas Automáticas

- Cálculo de médias por disciplina  
- Destaque visual para alunos em risco de reprovação  

### Persistência de Dados

- Armazenamento local no navegador  
- Exportação manual dos dados em formato JSON  

### Interface Intuitiva

- Layout responsivo que se adapta a diferentes dispositivos  
- Feedback visual instantâneo após cada ação

---

## Dependências

- **React 18**  
- **Vite 4**  
- **ESLint** com padrão **Airbnb**
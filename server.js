const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let alunos = [];

app.get('/alunos', (req, res) => {
  res.json(alunos);
});

app.post('/alunos', (req, res) => {
  const { nome, ira } = req.body;
  const novoAluno = { _id: Date.now().toString(), nome, ira };
  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

app.put('/alunos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, ira } = req.body;
  const index = alunos.findIndex(aluno => aluno._id === id);
  if (index !== -1) {
    alunos[index] = { ...alunos[index], nome, ira };
    res.json(alunos[index]);
  } else {
    res.status(404).send('Aluno não encontrado');
  }
});

app.delete('/alunos/:id', (req, res) => {
  const { id } = req.params;
  const index = alunos.findIndex(aluno => aluno._id === id);
  if (index !== -1) {
    alunos.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Aluno não encontrado');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

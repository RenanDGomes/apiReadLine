const express = require('express');
const readlineSync = require('readline-sync');
const { realizarTransacao } = require('./controllers/userController');

const app = express();

app.get('/', (req, res) => {
  res.send('API em funcionamento!');
});

// Função que controla a execução da transação e o servidor
async function iniciarAplicacao() {
  const acao = readlineSync.question('Deseja iniciar uma transacao? (sim/nao): ');

  if (acao === 'sim') {
    try {
      // Realiza a transação
      await realizarTransacao();
      console.log('Operacao finalizada.');
    } catch (err) {
      console.error('Erro na transacao:', err);
    }
  } else {
    console.log('Nenhuma transação foi realizada.');
  }

  // Após a transação ou caso o usuário tenha optado por não iniciar, o servidor será iniciado
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}

// Inicia o fluxo de interação e servidor
iniciarAplicacao();

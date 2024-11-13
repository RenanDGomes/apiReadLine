// controllers/usuarioController.js
const { User } = require('../models');
const readlineSync = require('readline-sync'); // Importa readline-sync para capturar a entrada do usuário

async function adicionarUser(transaction) {
  // Captura os dados do usuário através da linha de comando
  const nome = readlineSync.question('Digite o nome do usuario: ');
  const email = readlineSync.question('Digite o email do usuario: ');

  // Criar o usuário na transação
  return User.create({
    nome: nome,
    email: email
  }, { transaction });
}

async function editarUser(transaction) {
  // Captura o email do usuário para edição
  const email = readlineSync.question('Digite o email do usuario a ser inserido: ');

  // Simula a edição do usuário
  const user = await User.findOne({ where: { email: email } });
  
  if (user) {
    const novoNome = readlineSync.question('Digite o novo nome do usuario: '); // Captura o novo nome
    user.nome = novoNome;
    await user.save({ transaction });
  } else {
    console.log('Usuario nao encontrado!');
  }
}

module.exports = {
  realizarTransacao: async () => {
    const sequelize = require('../models').sequelize;

    const transaction = await sequelize.transaction();

    try {
      // Realizando ações dentro da transação
      await adicionarUser(transaction);
      await editarUser(transaction);

      // Pergunta ao usuário se ele deseja confirmar ou desfazer a transação
      const acao = readlineSync.question('Deseja confirmar a transacaoo (commit) ou desfazer (rollback)? (commit/rollback): ');

      if (acao === 'commit') {
        await transaction.commit();
        console.log('Transacao confirmada!');
      } else if (acao === 'rollback') {
        await transaction.rollback();
        console.log('Transacao desfeita!');
      } else {
        console.log('Acao invalida! A transacao sera desfeita.');
        await transaction.rollback();
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Erro na transacao:', error);
    }
  }
};

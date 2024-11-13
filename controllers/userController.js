const { User } = require('../models');
const readlineSync = require('readline-sync');

async function adicionarUser(transaction) {
  const nome = readlineSync.question('Digite o nome do usuario: ');
  const email = readlineSync.question('Digite o email do usuario: ');

  return User.create({
    nome: nome,
    email: email
  }, { transaction });
}

async function editarUser(transaction) {
  const email = readlineSync.question('Digite o email do usuario a ser editado: ');

  const user = await User.findOne({ where: { email: email } });

  if (user) {
    const novoNome = readlineSync.question('Digite o novo nome do usuario: ');
    user.nome = novoNome;
    await user.save({ transaction });
    console.log('Usuário atualizado com sucesso!');
  } else {
    console.log('Usuario nao encontrado!');
  }
}

module.exports = {
  realizarTransacao: async () => {
    const sequelize = require('../models').sequelize;
    const transaction = await sequelize.transaction();

    try {
      const acao = readlineSync.question('Deseja inserir um novo usuário ou editar um existente? (inserir/editar): ');

      if (acao === 'inserir') {
        await adicionarUser(transaction);
        console.log('Usuário inserido com sucesso!');
      } else if (acao === 'editar') {
        await editarUser(transaction);
      } else {
        console.log('Ação inválida! A transação será desfeita.');
        await transaction.rollback();
        return;
      }

      const confirmacao = readlineSync.question('Deseja confirmar a transacao (commit) ou desfazer (rollback)? (commit/rollback): ');

      if (confirmacao === 'commit') {
        await transaction.commit();
        console.log('Transação confirmada!');
      } else if (confirmacao === 'rollback') {
        await transaction.rollback();
        console.log('Transação desfeita!');
      } else {
        console.log('Ação inválida! A transação será desfeita.');
        await transaction.rollback();
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Erro na transação:', error);
    }
  }
};

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    });
  
    return User;
  };
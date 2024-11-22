module.exports = (sequelize, Sequelize) => {
    const UserCompte = sequelize.define('users_compte', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prenom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER
      },
      genre: {
        type: Sequelize.STRING
      },
      pays: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      }
    });
  
    return UserCompte;
  };
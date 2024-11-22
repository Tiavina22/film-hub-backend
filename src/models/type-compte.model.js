module.exports = (sequelize, Sequelize) => {
    const TypeCompte = sequelize.define('type_compte', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_users: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users_compte',
          key: 'id'
        }
      },
      etat: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          isIn: [[0, 1, 9]] // 0: free, 1: premium, 9: non actif
        }
      }
    });
  
    return TypeCompte;
  };
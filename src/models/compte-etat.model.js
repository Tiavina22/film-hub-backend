module.exports = (sequelize, Sequelize) => {
    const CompteEtat = sequelize.define('compte_etat', {
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
          isIn: [[0, 1]] // 0: non vérifié, 1: vérifié
        }
      }
    });
  
    return CompteEtat;
  };
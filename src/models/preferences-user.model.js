module.exports = (sequelize, Sequelize) => {
    const PreferencesUser = sequelize.define('preferences_user', {
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
      preference_genre: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return PreferencesUser;
  };
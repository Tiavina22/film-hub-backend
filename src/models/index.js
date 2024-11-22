const { Sequelize } = require('sequelize');
const config = require('../config/database.js');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models
db.UserCompte = require('./user-compte.model')(sequelize, Sequelize);
db.TypeCompte = require('./type-compte.model')(sequelize, Sequelize);
db.CompteEtat = require('./compte-etat.model')(sequelize, Sequelize);
db.PreferencesUser = require('./preferences-user.model')(sequelize, Sequelize);

// Relations
db.UserCompte.hasOne(db.TypeCompte, { foreignKey: 'id_users' });
db.TypeCompte.belongsTo(db.UserCompte, { foreignKey: 'id_users' });

db.UserCompte.hasOne(db.CompteEtat, { foreignKey: 'id_users' });
db.CompteEtat.belongsTo(db.UserCompte, { foreignKey: 'id_users' });

db.UserCompte.hasMany(db.PreferencesUser, { foreignKey: 'id_users' });
db.PreferencesUser.belongsTo(db.UserCompte, { foreignKey: 'id_users' });

module.exports = db;
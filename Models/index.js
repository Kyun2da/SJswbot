const Sequelize = require('sequelize');
const AssistantNotice = require('./assistantNotice');
const Department = require('./department');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = [];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.AssistantNotice = AssistantNotice;
db.Department = Department;

AssistantNotice.init(sequelize);
Department.init(sequelize);

AssistantNotice.associate(db);
Department.associate(db);

module.exports = db;

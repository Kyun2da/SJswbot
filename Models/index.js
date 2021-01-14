const Sequelize = require('sequelize');
const AssistantNotice = require('./assistantNotice');
const Department = require('./department');
const Role = require('./role');
const User = require('./user');
const Professor = require('./professor');
const KnowledgePlus = require('./knowledgePlus');
const Fallback = require('./fallback');
const Question = require('./question');
const Bestqa = require('./bestqa');
const Timetable = require('./timetable');
const Notice = require('./notice');
const Curriculum = require('./curriculum');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = [];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.AssistantNotice = AssistantNotice;
db.Department = Department;
db.Role = Role;
db.User = User;
db.Professor = Professor;
db.KnowledgePlus = KnowledgePlus;
db.Fallback = Fallback;
db.Question = Question;
db.Bestqa = Bestqa;
db.Timetable = Timetable;
db.Notice = Notice;
db.Curriculum = Curriculum;

AssistantNotice.init(sequelize);
Department.init(sequelize);
Role.init(sequelize);
User.init(sequelize);
Professor.init(sequelize);
KnowledgePlus.init(sequelize);
Fallback.init(sequelize);
Question.init(sequelize);
Bestqa.init(sequelize);
Timetable.init(sequelize);
Notice.init(sequelize);
Curriculum.init(sequelize);

AssistantNotice.associate(db);
Department.associate(db);
Role.associate(db);
User.associate(db);
Professor.associate(db);
Question.associate(db);
Bestqa.associate(db);
Timetable.associate(db);
Notice.associate(db);
Curriculum.associate(db);

module.exports = db;

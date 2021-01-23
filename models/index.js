const Sequelize = require('sequelize');
const AssistantNotice = require('./assistantNotice.db');
const Department = require('./department.db');
const Role = require('./role.db');
const User = require('./user.db');
const Professor = require('./professor.db');
const KnowledgePlus = require('./knowledgePlus.db');
const Fallback = require('./fallback.db');
const Question = require('./question.db');
const Bestqa = require('./bestqa.db');
const Timetable = require('./timetable.db');
const Notice = require('./notice.db');
const Curriculum = require('./curriculum.db');
const EmailVerify = require('./emailVerify.db');
const Status = require('./status.db');
const FixRequest = require('./fixRequest.db');

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
db.EmailVerify = EmailVerify;
db.Status = Status;
db.FixRequest = FixRequest;

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
EmailVerify.init(sequelize);
Status.init(sequelize);
FixRequest.init(sequelize);

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
Status.associate(db);

module.exports = db;

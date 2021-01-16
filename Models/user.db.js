const Sequelize = require('sequelize');

/**
 * @swagger
 *   components:
 *       schemas:
 *        user:
 *         type: object
 *         properties:
 *           idx:
 *             type: integer
 *             description: 아이디의 인덱스 입니다.
 *           userid:
 *             type: string
 *             description: 유저의 아이디 입니다.
 *           username:
 *             type: string
 *             description: 유저의 닉네임 입니다.
 *           password:
 *             type: string
 *             description: 유저의 비밀번호 입니다.
 *           phoneNumber:
 *             type: string
 *             description: 유저의 핸드폰 번호 입니다.
 *           email:
 *             type: string
 *             description: 유저의 이메일 입니다.
 *           department:
 *             type: string
 *             description: 유저의 학과입니다.
 *           role:
 *             type: string
 *             description: 유저의 직책입니다.
 *             example: 관리자 or 조교
 *           lastLogin:
 *             type: string
 *             description: 유저가 가장 최근에 로그인한 시간입니다.
 */

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userid: {
          type: Sequelize.STRING(25),
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING(25),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        phoneNumber: {
          type: Sequelize.STRING(25),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        lastLogin: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tableName: 'user',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate(db) {
    db.User.belongsTo(db.Department, {
      foreignKey: 'department',
      targetKey: 'idx',
    });
    db.User.belongsTo(db.Role, {
      foreignKey: 'role',
      targetKey: 'idx',
    });
    db.User.hasMany(db.Professor, {
      foreignKey: 'modifier',
      sourceKey: 'idx',
    });
    db.User.hasMany(db.Bestqa, {
      foreignKey: 'modifier',
      sourceKey: 'idx',
    });
    db.User.hasMany(db.Timetable, {
      foreignKey: 'modifier',
      sourceKey: 'idx',
    });
    db.User.hasMany(db.AssistantNotice, {
      foreignKey: 'modifier',
      sourceKey: 'idx',
    });
    db.User.hasMany(db.Notice, {
      foreignKey: 'modifier',
      sourceKey: 'idx',
    });
    db.User.hasMany(db.Curriculum, {
      foreignKey: 'modifier',
      sourceKey: 'idx',
    });
    db.User.hasMany(db.KnowledgePlus, {
      foreignKey: 'modifier',
      sourceKey: 'idx',
    });
  }
};

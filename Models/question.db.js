const Sequelize = require('sequelize');

/**
 * @swagger
 *   components:
 *       schemas:
 *        question:
 *         type: object
 *         properties:
 *           idx:
 *             type: integer
 *             description : 카카오톡으로 들어오는 질문의 인덱스 입니다.
 *           department:
 *             type: string
 *             description: 질문할 학과가 들어옵니다.
 *           content:
 *             type: text
 *             description: 질문한 내용이 들어옵니다.
 *           time:
 *             type: datetime
 *             description: 질문한 시간이 들어옵니다.
 *
 */
module.exports = class Question extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
        },
        time: {
          type: Sequelize.DATE,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Question',
        tableName: 'question',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Question.belongsTo(db.Department, {
      foreignKey: 'department',
      targetKey: 'idx',
    });
  }
};

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
 *           createdAt:
 *             type: datetime
 *             description: 등록한 시간이 들어갑니다.
 *           updatedAt:
 *             type: datetime
 *             description: 수정한 시간이 들어갑니다.
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
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Question',
        tableName: 'question',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
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

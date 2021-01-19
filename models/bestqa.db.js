const Sequelize = require('sequelize');

/**
 * @swagger
 *   components:
 *       schemas:
 *        bestqa:
 *         type: object
 *         properties:
 *           idx:
 *             type: integer
 *             description : 자주묻는 질문의 인덱스 입니다.
 *           question:
 *             type: string
 *             description: 자주묻는 질문 내용이 들어갑니다.
 *           createdAt:
 *             type: datetime
 *             description: 등록한 시간이 들어갑니다.
 *           updatedAt:
 *             type: datetime
 *             description: 수정한 시간이 들어갑니다.
 *           modifier:
 *             type: integer
 *             description: 수정한 사람의 인덱스가 들어갑니다.
 */
module.exports = class Bestqa extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        question: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Bestqa',
        tableName: 'bestqa',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Bestqa.belongsTo(db.User, { foreignKey: 'modifier', targetKey: 'idx' });
  }
};

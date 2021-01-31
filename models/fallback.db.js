const Sequelize = require('sequelize');

/**
 * @swagger
 *   components:
 *       schemas:
 *        fallback:
 *         type: object
 *         properties:
 *           idx:
 *             type: integer
 *             description : 폴백 발화의 인덱스입니다.
 *           question:
 *             type: text
 *             description: 폴백 블록의 대화입니다.
 *           createdAt:
 *             type: datetime
 *             description: 등록한 시간이 들어갑니다.
 *           updatedAt:
 *             type: datetime
 *             description: 수정한 시간이 들어갑니다.
 */
module.exports = class Fallback extends Sequelize.Model {
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
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Fallback',
        tableName: 'fallback',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};

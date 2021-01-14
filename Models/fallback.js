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
 *           time:
 *             type: datetime
 *             description: 폴백 블록이 등록된 시간입니다.
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
        time: {
          type: Sequelize.DATE,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Fallback',
        tableName: 'fallback',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
};

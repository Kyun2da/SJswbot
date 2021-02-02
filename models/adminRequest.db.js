const Sequelize = require('sequelize');

/**
 * @swagger
 *   components:
 *       schemas:
 *        adminRequest:
 *         type: object
 *         properties:
 *           idx:
 *             type: integer
 *             description : 관리자에게 요청하는 인덱스입니다.
 *           question:
 *             type: text
 *             description: 관리자에게 요청하는 대화입니다.
 *           createdAt:
 *             type: datetime
 *             description: 등록한 시간이 들어갑니다.
 *           updatedAt:
 *             type: datetime
 *             description: 수정한 시간이 들어갑니다.
 */
module.exports = class AdminRequest extends Sequelize.Model {
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
        modelName: 'AdminRequest',
        tableName: 'adminRequest',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};

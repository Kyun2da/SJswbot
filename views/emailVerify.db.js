const Sequelize = require('sequelize');

/**
 * @swagger
 *   components:
 *       schemas:
 *        emailVerify:
 *         type: object
 *         properties:
 *           idx:
 *             type: integer
 *             description: 이메일 인증의 인덱스입니다.
 *           email:
 *             type: string
 *             description: 인증 받을 이메일 주소입니다.
 *           number:
 *             type: number
 *             description: 이메일 인증 번호입니다.
 */
module.exports = class EmailVerify extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        number: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'EmailVerify',
        tableName: 'emailverify',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
};

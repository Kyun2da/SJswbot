const Sequelize = require('sequelize');

/**
 * @swagger
 *   components:
 *       schemas:
 *        professor:
 *         type: object
 *         properties:
 *           idx:
 *             type: integer
 *             description : 교수님 연구실의 인덱스 입니다.
 *           name:
 *             type: string
 *             description:  교수님의 성함이 들어갑니다.
 *           class:
 *             type: string
 *             description: 교수님 연구실의 정보가 들어갑니다.
 *           time:
 *             type: string
 *             description: 정보를 등록하거나 수정한 시간이 들어갑니다.
 *           modifier:
 *             type: integer
 *             description: 정보를 수정한 사람의 인덱스가 들어갑니다.
 */
module.exports = class Professor extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        class: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        time: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Professor',
        tableName: 'professor',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate(db) {
    db.Professor.belongsTo(db.User, {
      foreignKey: 'modifier',
      targetKey: 'idx',
    });
  }
};

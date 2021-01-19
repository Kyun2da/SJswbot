const Sequelize = require('sequelize');

/**
 * @swagger
 *   components:
 *       schemas:
 *        curriculum:
 *         type: object
 *         properties:
 *           idx:
 *             type: integer
 *             description : 교과과정의 인덱스 입니다.
 *           department:
 *             type: integer
 *             description: 교과과정의 학과입니다.
 *           link:
 *             type: text
 *             description: 교과과정의 링크입니다.
 *           createdAt:
 *             type: datetime
 *             description: 등록한 시간이 들어갑니다.
 *           updatedAt:
 *             type: datetime
 *             description: 수정한 시간이 들어갑니다.
 *           modifier:
 *             type: integer
 */
module.exports = class Curriculum extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        link: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Curriculum',
        tableName: 'Curriculum',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Curriculum.belongsTo(db.Department, { foreignKey: 'department', targetKey: 'idx' });
    db.Curriculum.belongsTo(db.User, { foreignKey: 'modifier', targetKey: 'idx' });
  }
};

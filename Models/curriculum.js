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
 *           time:
 *             type: datetime
 *             description: 교과과정을 등록하거나 수정한 시간입니다.
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
        time: {
          type: Sequelize.DATE,
        },
      },
      {
        sequelize,
        timestamps: false,
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

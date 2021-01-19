const Sequelize = require('sequelize');

/**
 * @swagger
 *   components:
 *       schemas:
 *        timetable:
 *         type: object
 *         properties:
 *           idx:
 *             type: integer
 *             description : 강의실의 인덱스 입니다.
 *           classname:
 *             type: string
 *             description:  강의실 이름 입니다.
 *           link:
 *             type: string
 *             description:  강의실 시간표 링크입니다.
 *           createdAt:
 *             type: datetime
 *             description: 등록한 시간이 들어갑니다.
 *           updatedAt:
 *             type: datetime
 *             description: 수정한 시간이 들어갑니다.
 *           modifier:
 *             type: integer
 *             description: 강의실 시간표를 수정한 사람의 인덱스입니다.
 */
module.exports = class Timetable extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        classname: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },
        link: {
          type: Sequelize.STRING(255),
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Timetable',
        tableName: 'timetable',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Timetable.belongsTo(db.User, { foreignKey: 'modifier', targetKey: 'idx' });
  }
};

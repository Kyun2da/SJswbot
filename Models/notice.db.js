const Sequelize = require('sequelize');

/**
 * @swagger
 *   components:
 *       schemas:
 *        notice:
 *         type: object
 *         properties:
 *           idx:
 *             type: integer
 *             description : 카카오 학과별 공지사항의 인덱스 입니다.
 *           department:
 *             type: integer
 *             description:  해당 학과의 인덱스입니다.
 *           link:
 *            type: text
 *            description: 공지사항의 링크입니다.
 *           time:
 *            type: datetime
 *            description: 공지사항을 등록하거나 수정한 시간입니다.
 *           modifier:
 *            type: integer
 *            description: 공지사항을 수정하거나 등록한사람의 인덱스입니다.
 */
module.exports = class Notice extends Sequelize.Model {
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
        modelName: 'Notice',
        tableName: 'notice',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Notice.belongsTo(db.Department, { foreignKey: 'department', targetKey: 'idx' });
    db.Notice.belongsTo(db.User, { foreignKey: 'modifier', targetKey: 'idx' });
  }
};

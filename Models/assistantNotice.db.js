const Sequelize = require('sequelize');

/**
 * @swagger
 *   components:
 *       schemas:
 *        AssistantNotice:
 *         type: object
 *         properties:
 *           idx:
 *             type: integer
 *             description : 조교공지의 인덱스 입니다.
 *           department:
 *             type: string
 *             description: 조교공지의 학과 입니다.
 *           content:
 *             type: text
 *             description: 조교공지의 내용 입니다.
 *           time:
 *             type: datetime
 *             description: 등록 or 수정한 시간이 들어갑니다.
 *           modifier:
 *             type: integer
 *             description: 수정한 사람의 인덱스가 들어갑니다.
 */
module.exports = class AssistantNotice extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
        },
        time: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'AssistantNotice',
        tableName: 'assistantnotice',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.AssistantNotice.belongsTo(db.Department, {
      foreignKey: 'department',
      targetKey: 'idx',
    });
    db.AssistantNotice.belongsTo(db.User, {
      foreignKey: 'modifier',
      targetKey: 'idx',
    });
  }
};

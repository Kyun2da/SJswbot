const Sequelize = require('sequelize');

/**
 * @swagger
 *   components:
 *       schemas:
 *        status:
 *         type: object
 *         properties:
 *           idx:
 *             type: integer
 *             description : 역할의 인덱스 입니다.
 *           status:
 *             type: string
 *             description: 역할이 들어갑니다.
 *             example: 조교
 *           department:
 *             type: integer
 *             description: 학과의 인덱스 입니다.
 *           createdAt:
 *             type: DATETIME
 *             description: 데이터가 추가된 시간입니다.
 *           updatedAt:
 *             type: DATETIME
 *             description: 데이터가 업데이트된 시간입니다.
 *           modifier:
 *             type: integer
 *             description: 데이터를 수정한 사람입니다.
 */
module.exports = class Status extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        status: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Status',
        tableName: 'status',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Status.belongsTo(db.User, {
      foreignKey: 'modifier',
      targetKey: 'idx',
    });
    db.Status.belongsTo(db.Department, {
      foreignKey: 'department',
      targetKey: 'idx',
    });
  }
};

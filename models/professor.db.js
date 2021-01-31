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
 *           classPosition:
 *             type: string
 *             description: 교수님 연구실의 정보가 들어갑니다.
 *           phoneNumber:
 *             type: string
 *             description: 교수님 연구실 전화번호가 들어갑니다.
 *           email:
 *             type: string
 *           description: 교수님 이메일이 들어갑니다.
 *           createdAt:
 *             type: datetime
 *             description: 등록한 시간이 들어갑니다.
 *           updatedAt:
 *             type: datetime
 *             description: 수정한 시간이 들어갑니다.
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
          unique: true,
        },
        classPosition: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        phoneNumber: {
          type: Sequelize.STRING(100),
        },
        email: {
          type: Sequelize.STRING(100),
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Professor',
        tableName: 'professor',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
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

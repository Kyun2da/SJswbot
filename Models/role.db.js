const Sequelize = require('sequelize');

/**
 * @swagger
 *   components:
 *       schemas:
 *        role:
 *         type: object
 *         properties:
 *           idx:
 *             type: integer
 *             description : 역할의 인덱스 입니다.
 *           role:
 *             type: string
 *             description: 역할이 들어갑니다.
 *             example: 조교
 */
module.exports = class Role extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        role: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Role',
        tableName: 'role',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Role.hasMany(db.User, { foreignKey: 'role', sourceKey: 'idx' });
  }
};

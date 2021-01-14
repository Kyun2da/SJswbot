const Sequelize = require('sequelize');

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
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
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

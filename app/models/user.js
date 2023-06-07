'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, {
        through: 'user_roles',
        foreignKey: 'userId',
      });

      User.hasMany(models.Order, {
        foreignKey: 'user_id',
      });
    }
  }
  User.init(
    {
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        afterCreate: async (user, option) => {
          const data = JSON.stringify(user.toJSON());
          await sequelize.models.AuditLogs.create({
            table: 'users',
            task: 'INSERT',
            deskripsi: `menambahkan data ${data} kedalam tabel user.`,
          });
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};

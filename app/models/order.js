'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: 'user_id',
      });

      Order.belongsTo(models.Package, {
        foreignKey: 'paket_id',
      });

      Order.belongsTo(models.Service, {
        foreignKey: 'layanan_id',
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      paket_id: DataTypes.INTEGER,
      layanan_id: DataTypes.INTEGER,
    },
    {
      hooks: {
        afterCreate: async (order, option) => {
          const data = JSON.stringify(order.toJSON());
          await sequelize.models.AuditLogs.create({
            table: 'orders',
            task: 'INSERT',
            deskripsi: `menambahkan data ${data} kedalam tabel order.`,
          });
        },
        afterUpdate: async (order, option) => {
          await sequelize.models.AuditLogs.create({
            table: 'orders',
            task: 'UPDATE',
            deskripsi: `memperbarui data pada id ${data.id} ditabel order.`,
          });
        },
        afterDestroy: async (order, option) => {
          await sequelize.models.AuditLogs.create({
            table: 'orders',
            task: 'DELETE',
            deskripsi: `menghapus data pada id ${data.id} ditabel order.`,
          });
        },
      },
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};

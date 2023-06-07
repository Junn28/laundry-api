const { User, Order } = require('../models');

module.exports = {
  addOrderUser(req, res) {
    User.findOne({
      where: {
        email: req.email,
      },
    })
      .then((user) => {
        return Order.create({
          user_id: user.id,
          paket_id: req.body.paketId,
          layanan_id: req.body.layananId,
        })
          .then((data) => {
            res.status(201).send({
              status: 'OK',
              message: 'Your order successfully added.',
              data,
              errors: null,
            });
          })
          .catch((err) => {
            res.status(400).send({
              status: 'Bad Request',
              errors: err,
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          status: 'Error',
          message: 'Email not found!',
          errors: err,
        });
      });
  },

  listOrderLaundry(req, res) {
    return Order.findAll({
      include: [],
      order: [['createdAt', 'DESC']],
    })
      .then((orders) => {
        res.status(200).send({
          status: 'OK',
          count: orders.length,
          data: orders.map((order) => order),
          error: null,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 'Bad Request',
          errors: err,
        });
      });
  },

  getOrderById(req, res) {
    return Order.findByPk(req.params.id, {
      include: [],
    })
      .then((order) => {
        if (!order) {
          return res.status(404).send({
            status: 'Not Found',
            errors: 'Order Not Found',
          });
        }

        return res.status(200).send({
          status: 'OK',
          data: order,
          errors: null,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 'Bad Request',
          errors: err,
        });
      });
  },

  updateOrderByUser(req, res) {
    User.findOne({
      where: {
        email: req.email,
      },
    }).then((user) => {
      return Order.findByPk(req.params.id, {})
        .then((order) => {
          if (!order) {
            return res.status(404).send({
              status: 'Not Found',
              errors: 'Order Not Found',
            });
          }
          if (user.email !== req.email) {
            return res.status(403).send({
              status: 'Bad Request',
              errors: 'Different Email',
            });
          }

          return order
            .update({
              user_id: user.id,
              paket_id: req.body.paketId || order.paket_id,
              layanan_id: req.body.layananId || order.layanan_id,
            })
            .then((data) => {
              return res.status(200).send({
                status: 'OK',
                message: 'Order successfully updated by User',
                data,
                errors: null,
              });
            })
            .catch((err) => {
              res.status(400).send({
                status: 'Bad Request',
                errors: err,
              });
            });
        })
        .catch((err) => {
          res.status(400).send({
            status: 'Bad Request',
            errors: err,
          });
        });
    });
  },

  updateOrderByAdmin(req, res) {
    User.findOne({
      where: {
        email: req.email,
      },
    }).then(() => {
      return Order.findByPk(req.params.id, {})
        .then((order) => {
          if (!order) {
            return res.status(404).send({
              status: 'Not Found',
              errors: 'Order Not Found',
            });
          }

          return order
            .update({
              isCompleted: req.body.isCompleted,
            })
            .then((data) => {
              return res.status(200).send({
                status: 'OK',
                message: 'Order successfully updated by Admin',
                data,
                errors: null,
              });
            })
            .catch((err) => {
              res.status(400).send({
                status: 'Bad Request',
                errors: err,
              });
            });
        })
        .catch((err) => {
          res.status(400).send({
            status: 'Bad Request',
            errors: err,
          });
        });
    });
  },

  deleteOrder(req, res) {
    User.findOne({
      where: {
        email: req.email,
      },
    }).then((user) => {
      return Order.findByPk(req.params.id, {})
        .then((order) => {
          if (!order) {
            return res.status(404).send({
              status: 'Not Found',
              errors: 'Order Not Found',
            });
          }

          if (user.email !== req.email) {
            return res.status(403).send({
              status: 'Bad Request',
              errors: 'Different Email',
            });
          }

          return order
            .destroy()
            .then(() => {
              res.status(200).send({
                status: 'OK',
                message: 'Order successfully deleted',
                errors: null,
              });
            })
            .catch((err) => {
              res.status(400).send({
                status: 'Bad Request',
                errors: err,
              });
            });
        })
        .catch((err) => {
          res.status(400).send({
            status: 'Bad Request',
            errors: err,
          });
        });
    });
  },
};

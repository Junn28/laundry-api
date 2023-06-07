const { ROLEs } = require('../config/configRoles');
const User = require('../models').User;

module.exports = {
  checkRolesExisted(req, res, next) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLEs.includes(req.body.roles[i].toUpperCase())) {
        res.status(400).send({
          auth: false,
          email: req.body.email,
          message: 'Error',
          errors: 'Does NOT exist Role = ' + req.body.roles[i],
        });
        return;
      }
    }
    next();
  },

  checkIsAdmin(req, res, next) {
    User.findOne({
      where: {
        email: req.email,
      },
    }).then((user) => {
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          console.log(roles[i].name);
          if (roles[i].name.toUpperCase() === 'ADMIN') {
            next();
            return;
          }
        }
        res.status(403).send({
          auth: false,
          message: 'Error',
          message: 'Require Admin Role',
        });
        return;
      });
    });
  },

  checkIsUser(req, res, next) {
    User.findOne({
      where: {
        email: req.email,
      },
    }).then((user) => {
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          console.log(roles[i].name);
          if (roles[i].name.toUpperCase() === 'USER') {
            next();
            return;
          }
        }
        res.status(403).send({
          auth: false,
          message: 'Error',
          message: 'Require User Role',
        });
        return;
      });
    });
  },
};

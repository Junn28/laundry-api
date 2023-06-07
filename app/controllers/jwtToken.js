const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;

module.exports = {
  verifyToken(req, res, next) {
    let tokenHeader = req.headers['x-access-token'];

    if (tokenHeader.split(' ')[0] !== 'Bearer') {
      return res.status(500).send({
        auth: false,
        message: 'Error',
        errors: 'Incorrect token format',
      });
    }

    let token = tokenHeader.split(' ')[1];

    if (!token) {
      return res.status(403).send({
        auth: false,
        message: 'Error',
        errors: 'No token provided',
      });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: 'Error',
          errors: err,
        });
      }
      req.email = decoded.email;
      next();
    });
  },
};

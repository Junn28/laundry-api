const { checkUser, jwtToken, orderLaundry, regisUser } = require('../controllers');

module.exports = (app) => {
  //user auth
  app.post('/api/auth/signup', [checkUser.checkRolesExisted], regisUser.verifySignUp);
  app.post('/api/auth/signin', regisUser.verifySignIn);

  //order by user
  app.post('/api/order', [jwtToken.verifyToken, checkUser.checkIsUser], orderLaundry.addOrderUser);
  app.put('/api/order/:id', [jwtToken.verifyToken, checkUser.checkIsUser], orderLaundry.updateOrderByUser);

  //order by admin
  app.get('/api/order/:id', [jwtToken.verifyToken, checkUser.checkIsAdmin], orderLaundry.getOrderById);
  app.put('/api/order/:id', [jwtToken.verifyToken, checkUser.checkIsAdmin], orderLaundry.updateOrderByAdmin);

  //order both
  app.get('/api/order', [jwtToken.verifyToken], orderLaundry.listOrderLaundry);
  app.delete('/api/order/:id', [jwtToken.verifyToken], orderLaundry.deleteOrder);
};

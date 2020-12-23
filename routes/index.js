const auth = require("./auth");
const admin = require('./admin');
const employee = require('./employee');

module.exports = {
  authRouter: auth,
  adminRouter: admin,
  empRouter: employee
}
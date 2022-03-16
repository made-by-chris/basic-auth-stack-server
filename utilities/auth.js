const User = require("../models/User");

function isLoggedIn(req, res, next) {
  if (req.token && req.token.user_id) {
    next();
  } else {
    res.send(`<html>
    <body>
      <h1>welcome to the site. please log in to continue</h1>
    </body>
    </html>`);
  }
  // has token
  // token contains user id
  // token is not expired
}

function isPaidAccount(req, res, next) {
  // the user id is a real / existing account
  // const user = await User.findById(req.body.UserId)
  // user.accountIsPaid
}

function ownsRequestedProduct(req, res, next) {}

module.exports = {
  isLoggedIn,
  isPaidAccount,
  ownsRequestedProduct,
};

const jwt = require("jsonwebtoken");

const generateToken = (data, secret) =>
  jwt.sign(data, secret, { expiresIn: "1800s" });

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const decodeToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, token) => {
        req.token = token;
        next();
      });
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};

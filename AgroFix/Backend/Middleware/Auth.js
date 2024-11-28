const jwt = require("jsonwebtoken");

const Authentication = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ msg: "No token provided" });
    }

    const decoded = await jwt.verify(token, "lokesh");

    if (decoded?.userid) {
      req.body.userid = decoded.userid;
      next();
    } else {
      res.status(401).send({ msg: "Invalid or expired token" });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).send({ msg: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).send({ msg: "Invalid token" });
    } else {
      res.status(500).send({ msg: "Internal Server Error" });
    }
  }
};

module.exports = Authentication;

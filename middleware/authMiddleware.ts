import { onGetValueRedis } from "../contoller/redisController";
var jwt = require("jsonwebtoken");

const isLoggedIn = async (req: any, res: any, next: any) => {
  const tokenRedis = await onGetValueRedis("token");
  const header = req.headers["authorization"];

  //Split Header
  const bearer = header?.split(" ");
  const token = bearer?.[1];

  jwt.verify(token, process.env.JWT_TOKEN_KEY, function (err:any, decoded:any) {
    if (!err) {
      next();
    } else {
      // return unauthorized
      res.send(401, "Unauthorized");
    }
  });
};

module.exports = isLoggedIn;

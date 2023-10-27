import jwt = require("jsonwebtoken");
import Administration from "../components/administration/administration.model";
/**
 * admin authentication
 */
export default async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (token == "") {
      return res.status(401).send("Please login");
    }

    const decoded = jwt.verify(token, "TEMPKEY");

    const administrator = await Administration.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!administrator) {
      return res.status(401).send("Please login");
    }

    req.token = token;
    req.user = administrator;

    // console.log(req.user);
    next();
  } catch (e) {
    res.status(401).send("Please Authenticate");
  }
};

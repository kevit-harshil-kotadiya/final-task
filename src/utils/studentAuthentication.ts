import jwt = require("jsonwebtoken");
import Student from "../components/student/student.model";

export default async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (token == "") {
      return res.status(401).send("Please login");
    }

    const decoded = jwt.verify(token, "TEMPKEY");

    const student = await Student.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!student) {
      return res.status(401).send("Please login");
    }

    req.token = token;
    req.user = student;

    next();
  } catch (e) {
    res.status(401).send("Please Authenticate");
  }
};

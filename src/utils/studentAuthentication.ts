import jwt = require("jsonwebtoken");
import Student from "../components/student/student.model";

/**
 * Middleware for authenticating and authorizing requests.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {Function} next - The callback to call to continue processing the request.
 */
export default async (req, res, next) => {
  try {
    // Extract the token from the Authorization header.
    const token = req.header("Authorization").replace("Bearer ", "");

    // Check if the token is missing or empty.
    if (token == "") {
      return res.status(401).send("Please login");
    }

    // Verify the token using a secret key (in this case, "TEMPKEY").
    const decoded = jwt.verify(token, "TEMPKEY");

    // Find the student associated with the decoded user ID and token.
    const student = await Student.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    // Check if no student is found, indicating invalid authentication.
    if (!student) {
      return res.status(401).send("Please login");
    }

    // Attach the token and student information to the request for further use.
    req.token = token;
    req.user = student;

    // Continue processing the request.
    next();
  } catch (e) {
    // Handle any errors during authentication or token verification.
    res.status(401).send("Please Authenticate");
  }
};

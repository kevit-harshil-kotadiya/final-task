// In your "../../utils/adminAuthorization" module

/**
 * Authorization Middleware for Admin Routes
 */
export const adminAuthorization = async (req, res, next) => {
  try {
    if (req.user.profile === "admin") {
      next();
    } else {
      return res.status(401).send("Only admin users are permitted to access this route");
    }
  } catch (e) {
    res.status(401).send({ error: "Only admin users are permitted to access this route" });
  }
};

/**
 * Authorization Middleware for Staff Routes
 */
export const staffAuthorization = async (req, res, next) => {
  try {
    if (req.user.profile === "admin" || req.user.profile === "staff") {
      next();
    } else {
      return res.status(401).send("Only admin and staff users are permitted to access this route");
    }
  } catch (e) {
    res.status(401).send({ error: "Only admin and staff users are permitted to access this route" });
  }
};

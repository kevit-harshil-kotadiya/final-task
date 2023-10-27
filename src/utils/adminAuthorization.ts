/**
 * admind Authorization
 */
export default async (req, res, next) => {
  try {
    if (req.user.profile === "admin") {
      next();
    } else {
      return res.status(401).send("Only admin are permitted to add staff");
    }
  } catch (e) {
    res.status(401).send({ error: "Only admin are permitted to add staff" });
  }
};

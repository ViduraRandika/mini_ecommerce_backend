import { verifyToken } from "../Utils/VerifyToken.js";

export const userAuthorization = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verify = verifyToken(token);
    if (verify) {
        next();
    } else {
      res.status(401).send({ error: "Unauthorized request" });
    }
  } catch (error) {
    res.status(401).send({ error: "Unauthorized request" });
  }
};

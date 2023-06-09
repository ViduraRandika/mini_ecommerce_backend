import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    if (verify) {
      return verify;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

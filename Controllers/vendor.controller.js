import bcrypt from "bcrypt";
import Vendor from "../models/vendor.model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { verifyToken } from "../Utils/VerifyToken.js";

dotenv.config();

const saltRounds = 10;

export const registerVendor = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const newVendor = new Vendor({ name, email, password: hash });
    const vendor = await newVendor.save();
    res.send(vendor);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "Server error" });
  }
};

export const loginVendor = async (req, res) => {
  console.log(req.cookies.jwt);
  const { email, password } = req.body;
  try {
    // Retrieve user from the database
    const vendor = await Vendor.findOne({ email: email });

    // If user doesn't exist, deny login request
    if (!vendor) {
      return res.status(401).send({ msg: "Invalid credentials" });
    }

    // Compare the password provided by the user with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, vendor.password);

    // If passwords don't match, deny login request
    if (!passwordMatch) {
      return res.status(401).send({ msg: "Invalid credentials" });
    }

    const name = vendor.name;
    const userId = vendor._id;

    const user = { email, name, userId };

    //Genarate JWT token with including created user object data.
    const token = jwt.sign(user, process.env.JWT_SECRET);

    //Create httponly cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.send({ msg: "Logged in successfully!", vendor: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "Server error" });
  }
};

export const verifyLogin = (req, res) => {
  try {
    const token = req.cookies.jwt;
    const verify = verifyToken(token);
    if (verify) {
      res.send(verify);
    } else {
      res.status(401).send({ error: "Unauthorized request" });
    }
  } catch (error) {
    res.status(401).send({ error: "Unauthorized request" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", { httpOnly: true });
    res.send();
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "Server error" });
  }
}
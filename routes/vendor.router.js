import express from "express";
import Vendor from "../models/vendor.model";

const vendorRouter = express.Router();

//Register vendor
vendorRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newVendor = new Vendor({ name, email, password });
    const vendor = await newVendor.save();
    res.send(vendor);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "Server error" });
  }
});

//Login Vendor
vendorRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email: email });
    if (!vendor) {
      return res.status(404).send({ msg: "User not found" });
    } else {
      if (vendor.password === password) {
        return res.send({ msg: "User logged in" });
      } else {
        return res
          .status(401)
          .send({ msg: "Incorrect email password, try again" });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "Server error" });
  }
});

export default vendorRouter;
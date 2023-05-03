import express from "express";
import {
  registerVendor,
  loginVendor,
  verifyLogin,
  logout,
} from "../Controllers/vendor.controller.js";

const vendorRouter = express.Router();

vendorRouter.post("/register", registerVendor);
vendorRouter.post("/login", loginVendor);
vendorRouter.post("/verify", verifyLogin);
vendorRouter.post("/logout", logout);

export default vendorRouter;

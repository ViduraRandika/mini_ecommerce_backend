import express from "express";
import {
  registerVendor,
  loginVendor,
  verifyLogin,
} from "../Controllers/vendor.controller.js";

const vendorRouter = express.Router();

vendorRouter.post("/register", registerVendor);
vendorRouter.post("/login", loginVendor);
vendorRouter.post("/verify",verifyLogin)

export default vendorRouter;

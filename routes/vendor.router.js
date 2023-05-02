import express from "express";
import {
  registerVendor,
  loginVendor,
} from "../Controllers/vendor.controller.js";

const vendorRouter = express.Router();

vendorRouter.post("/register", registerVendor);
vendorRouter.post("/login", loginVendor);

export default vendorRouter;

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import productRouter from "./routes/product.router.js";
import vendorRouter from "./routes/vendor.router.js";

dotenv.config();

const app = express();

// Enable cookie parsing middleware
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // set frontend origin
    credentials: true, // allow sending cookies
  })
);
app.use(morgan("dev"));

//import routes
app.use("/api/products", productRouter);
app.use("/api", vendorRouter);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from 'morgan';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// mounting routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
// paypal config route (when we ready to make a payment, we hit this route and fetch client id)
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

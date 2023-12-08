import express from "express";
import {
  generateDiscountCode,
  purchaseStats,
} from "../handlers/adminHandlers.js";

const router = express.Router();

router.post("/generateDiscountCode", generateDiscountCode);

router.get("/purchaseStats", purchaseStats);

export default router;

import express from "express";
import {
  addItemToCart,
  checkoutItems,
  deleteItemFromCart,
  viewCart,
} from "../handlers/userHandlers.js";

const router = express.Router();

router.post("/cart/add", addItemToCart);

router.post("/cart/delete", deleteItemFromCart);

router.post("/checkout", checkoutItems);

router.post("/cart/view", viewCart);

export default router;

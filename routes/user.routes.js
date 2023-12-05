import express from "express";

const router = express.Router();

router.post("/cart/add", (req, res) => {
  console.log("add");
  res.json({ message: "example" });
});

export default (carts) => {
  router.locals = { carts };
  return router;
};

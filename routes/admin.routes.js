import express from "express";

const router = express.Router();

router.post("/stats", (req, res) => {
  console.log("stats");
  res.json({ message: "example" });
});

export default (carts) => {
  router.locals = { carts };
  return router;
};

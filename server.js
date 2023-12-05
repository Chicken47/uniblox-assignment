import bodyParser from "body-parser";
import express from "express";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = 3000;

const carts = {};

app.use(bodyParser.json());

app.use("/admin", adminRoutes(carts));
app.use("/user", userRoutes(carts));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

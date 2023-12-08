import bodyParser from "body-parser";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = 3000;

app.locals.carts = {};

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "abcabc",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

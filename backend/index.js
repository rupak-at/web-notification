import e from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./router/index.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = e();
const PORT = process.env.PORT || 3000;

app.use(cookieParser())
app.use(
  cors(
    process.env.NODE_ENV === "production"
      ? {
          origin: "https://your-production-domain.com",
          credentials: true,
          methods: ["GET", "POST", "PUT", "DELETE"],
        }
      : {
          origin: "http://localhost:5173",
          credentials: true,
          methods: ["GET", "POST", "PUT", "DELETE"],
        },
  ),
);
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send("Hello We are runnig for the weh push notifications");
});

app.use("/api", route);

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`,
  );
});

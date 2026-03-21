import e from "express";
import cors from "cors";
import route from "./router/index.js";

const app = e();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send("Hello We are runnig for the weh push notifications");
});

app.use("/api", route);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

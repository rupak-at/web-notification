import e from "express";
import { firebaseAdmin } from "../config/firebase.js";
import db from "../config/database.js";
import { generateToken } from "../utils/tokenGeneration.js";

const router = e.Router();

router.post("/login", async (req, res) => {
  try {
    const { token, details } = req.body;
    if (!token || !details) {
      return res
        .status(400)
        .json({ message: "Token and details are required" });
    }

    const validateToken = await firebaseAdmin.auth().verifyIdToken(token);
    if (!validateToken) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    await db("users").insert(details).onConflict("email").merge();
    const jwtToken = generateToken({ email: details.email });
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    res
      .status(200)
      .json({ message: "Login Successful", details, token: jwtToken });
  } catch (error) {
    console.error("Error While Loggin In: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;

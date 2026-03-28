import e from "express";
import { firebaseAdmin } from "../config/firebase.js";
import db from "../config/database.js";
import { generateToken } from "../utils/tokenGeneration.js";
import { verifyToken } from "../middleware/verifyToken.js";

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
    const user = await db("users").where({ email: details.email }).first();
    const userId = user?.id;
    const jwtToken = generateToken({ email: details.email, id: userId });
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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

router.put("/store-fcm-token", verifyToken, async (req, res) => {
  try {
    const { fcmToken } = req.body;
    if (!fcmToken) {
      return res.status(400).json({ message: "FCM Token is required" });
    }

    const email = req.user.email;
    if (!email) {
      return res.status(400).json({ message: "Invalid user session" });
    }
    const user = await db("users").where({ email }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await db("users").where({ email }).update({ fcm_token: fcmToken });
    res.status(200).json({ message: "FCM Token Stored Successfully" });
  } catch (error) {
    console.error("Error While Storing FCM Token: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/add-notification", verifyToken, async (req, res) => {
  try {
    const { title, message } = req.body;
    const id = req.user.id;
    if (!title || !message) {
      return res
        .status(400)
        .json({ message: "Title and Message are required" });
    }
    await db("notification").insert({ title, message, user_id: id });
    res.status(200).json({ message: "Notification Added Successfully" });
  } catch (error) {
    console.error("Error While Adding Notification: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/notifications", verifyToken, async (req, res) => {
  try {
    const id = req.user.id;
    const notifications = await db("notification")
      .where({ user_id: id })
      .orderBy("created_at", "desc");
    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error While Fetching Notifications: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post(
  "/send-notification",
  verifyToken,
  async (req, res) => {
    try {
      const users = await db("users as u")
        .join("notification as n", "u.id", "n.user_id")
        .whereNotNull("u.fcm_token")
        .where("n.status", "pending")
        .select(
          "u.fcm_token",
          "n.id as notification_id",
          "n.title",
          "n.message",
        );

      if (users.length === 0) {
        return res.status(200).json({ 
          message: "No pending notifications to send",
          success: 0,
          failed: 0 
        });
      }

      const results = await Promise.allSettled(
        users.map((user) => {
          const message = {
            token: user.fcm_token,
            notification: {
              title: user.title,
              body: user.message,
            },
            data: {
              notification_id: String(user.notification_id)
            }
          };

          return firebaseAdmin.messaging().send(message);
        }),
      );

      const successIds = [];
      const failedLogs = [];

      results.forEach((result, index) => {
        const notificationId = users[index].notification_id;

        if (result.status === "fulfilled") {
          successIds.push(notificationId);
        } else {
          failedLogs.push({
            notification_id: notificationId,
            error_message: result.reason?.message || "Unknown error",
          });
          console.error(`Failed to send notification ${notificationId}:`, result.reason);
        }
      });

      if (successIds.length > 0) {
        await db("notification")
          .whereIn("id", successIds)
          .update({ status: "success" });
      }

      const failedIds = failedLogs.map((f) => f.notification_id);

      if (failedIds.length > 0) {
        await db("notification")
          .whereIn("id", failedIds)
          .update({ status: "error" });

        await db("notification_logs").insert(failedLogs);
      }

      res.status(200).json({
        message: "Notifications Processed",
        success: successIds.length,
        failed: failedIds.length,
      });
    } catch (error) {
      console.error("Error While Sending Notification:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  },
);

export default router;

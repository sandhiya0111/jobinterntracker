const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SESSION_COOKIE_NAME, requireSession } = require("../middleware/authMiddleware");

const router = express.Router();
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  };
}

function createSession(user, res) {
  const token = jwt.sign(
    { sub: user._id.toString(), email: user.email },
    process.env.AUTH_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie(SESSION_COOKIE_NAME, token, cookieOptions());
  return { id: user._id, name: user.name, email: user.email };
}

router.post("/register", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!name || !/^\S+@\S+\.\S+$/.test(email) || password.length < 8) {
      return res.status(400).json({
        message: "Enter a name, valid email, and password of at least 8 characters.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await User.create({ name, email, passwordHash });

    return res.status(201).json({
      message: "Account created successfully. Please log in.",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }
    console.error("Registration error:", error.message);
    return res.status(500).json({ message: "Unable to create your account right now." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const user = await User.findOne({ email }).select("+passwordHash");

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return res.json({ user: createSession(user, res), message: "Logged in successfully." });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Unable to log in right now." });
  }
});

router.get("/me", requireSession, async (req, res) => {
  try {
    const user = await User.findById(req.session.sub).select("name email");
    if (!user) return res.status(401).json({ message: "Please log in." });
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Unable to retrieve your session." });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie(SESSION_COOKIE_NAME, { ...cookieOptions(), maxAge: undefined });
  return res.json({ message: "Logged out successfully." });
});

module.exports = router;
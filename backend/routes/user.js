const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../database/db");
const { authMiddleware } = require("../middleware");
const signinbody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const signupbody = zod.object({
  username: zod.string(),
  password: zod.string(),
  lastName: zod.string(),
  firstName: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  username: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupbody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect Inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
  });

  const userId = user._id;
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  res.json({
    message: "User created succesfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signinbody.safeParse(req.body);
  if (!success) {
    res.json({
      msg: "Invalid type",
    });
  } else {
    const user = await User.findOne({
      userName: req.body.userName,
      password: req.body.password,
    });
    if (user) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET
      );

      res.json({
        token: token,
      });
      return;
    }

    res.status(411).json({
      message: "Error while logging in",
    });
  }
});

module.exports = router;

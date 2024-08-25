const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User } = require("../database/db");
const signupbody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const signinbody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinbody.safeParse(req.body);
  if (!success) {
    return res.json({
      msg: "Incorrect inputs",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
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
    message: "No user found",
  });
});

router.post("/signup", async (req, res) => {
  const { success } = signupbody.safeParse(req.body);
  console.log(success);
  if (!success) {
    return res.status(411).json({
      message: "Zod error",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.json({
      message: "User already exist",
    });
  }

  const dbUser = new User(req.body);
  await dbUser.save();
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created succesfully",
    token: token,
  });
});

module.exports = router;

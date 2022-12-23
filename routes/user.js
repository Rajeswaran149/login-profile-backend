const User = require("../models/user.js");
const express = require("express");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    const user = await newUser.save();
    res.send({ user });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user.password == password) {
      await user.save();
      res.status(200).json("Login success");
    } else {
      res.send("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/profile", async (req, res) => {
  try {
    const newData = await User.create({
      age: req.body.age,
      gender: req.body.gender,
      dob: req.body.dob,
      mobile: req.body.mobile,
      address: req.body.address,
    });
    const data = await newData.save();
    res.send({ data });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;

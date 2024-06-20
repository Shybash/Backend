const Student = require("../models/Student");
const PersonalInfo = require("../models/Stdinfo");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const register = async (req, res, next) => {
  try {
    const { username, rollnum, email, password, confirmpassword } = req.body;

    if (!username || !rollnum || !email || !password || !confirmpassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password should be at least 6 characters long" });
    }

    const exist = await Student.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: "User already exists" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Student({ email, password: hashedPassword });
    await newUser.save();

    console.log(newUser._id, username, rollnum);

    const personalInfo = new PersonalInfo({
      userId: newUser._id,
      username,
      rollnum,
    });
    await personalInfo.save();

    res.status(201).json({
      message: "User registered Successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.register = register;
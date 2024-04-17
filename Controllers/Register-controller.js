const Student = require("../models/Student");
const PersonalInfo = require("../models/Stdinfo");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const register = async (req, res, next) => {
  try {
    const { username, rollnum, email, password, confirmpassword } = req.body;

    // Validate required fields
    if (!username || !rollnum || !email || !password || !confirmpassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password should be at least 6 characters long" });
    }

    // Check if email already exists
    const exist = await Student.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Check if passwords match
    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new student document
    const newUser = new Student({ email, password: hashedPassword });
    await newUser.save();

    console.log(newUser._id, username, rollnum);

    // Create new personal info document
    const personalInfo = new PersonalInfo({
      userId: newUser._id,
      username,
      rollnum,
    });
    await personalInfo.save();

    // Respond with the message
    res.status(201).json({
      message: "User registered Successfully",
    });
  } catch (error) {
    // Pass error to error handling middleware
    res.status(400).json({ error: error.message });
  }
};

exports.register = register;
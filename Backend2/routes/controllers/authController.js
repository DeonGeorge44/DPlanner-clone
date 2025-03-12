const User = require('../models/User')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


// Signup Controller
const signup = async (req, res) => {
  try {
    const { name, gender, email, phone, password, confirmPassword } = req.body;

    // Check if all fields are provided
    if (!name || !gender || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    // Check if users collection is empty
    const isFirstUser = (await User.countDocuments()) === 0;
    const role = isFirstUser ? "Admin" : "User";

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, gender, email, phone, password,role });

    // Save user to database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




//  Login Controller
const login = async (req, res) => {
    try {
    const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      // Find user by email
    const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      //  Generate JWT token
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
    //   res.status(200).json({ message: "Login successful", token, userId: user._id });
    // } catch (error) {
    //   res.status(500).json({ message: "Server error", error: error.message });
    // }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }

  };






  // Get user details 
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


  

module.exports = { signup,login,getUserProfile };
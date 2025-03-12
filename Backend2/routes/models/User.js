const mongoose = require('mongoose')
const bcrypt =require('bcrypt')


const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"]
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: { type: String, 
            enum: ["Admin", "User"], 
            default: "User" },
    otp: String,
    otpExpires: Date
  });

//   userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     try {
//       const salt = await bcrypt.genSalt(10);
//       this.password = await bcrypt.hash(this.password, salt);
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  const User = mongoose.model("User", userSchema);

  module.exports = User;
import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true,"please provide name"],
    },
    email: {
      type: String,
      required: [true,"please provide email"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true,"please provide phone number"],
    },
    password: {
      type: String,
      required: [true,"please provide password"],
    },
    role: {
      type: String,
      enum: ['user', 'turf', 'admin'],
      default: 'user',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

  });

const User = mongoose.models.users || mongoose.model("users", UserSchema);

export default User;
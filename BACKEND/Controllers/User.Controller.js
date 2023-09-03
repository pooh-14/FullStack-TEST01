import UserModal from "../Modal/User.Modal.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

export const Register = async (req, res) => {
  try {
    const { name, email, password, role, number } = req.body;
    console.log(name, email, password, role, number);

    if (!name || !email || !password || !role || !number) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory!",
      });
    }


    const isEmailExist = await UserModal.findOne({ email: email }).exec();

    if (isEmailExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists! Try a new one.",
      });
    }

    const hashPassW = await bcrypt.hash(password, 10);

    const user = new UserModal({
      name,
      email,
      password: hashPassW,
      role,
      number,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({
        success: false,
        message: "All feilds are mandatory!",
      });

    const user = await UserModal.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found!" });

    const isPasswordRight = await bcrypt.compare(password, user.password);
    if (isPasswordRight) {
      const userObj = {
        name: user.name,
        email: user.email,
        _id: user._id,
        role: user.role,
      };

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      return res.json({
        success: true,
        message: "Login Successfull",
        user: userObj,
        token: token,
      });
    }
    return res.json({ success: false, message: "Password is Wrong!" });
  } catch (error) {
    return res.json({ success: false, message: error.message});
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res
        .status(404)
        .json({ success: false, message: "Token is Required!!" });
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeData) {
      return res
        .status(404)
        .json({ success: false, message: "Not a valid Token!" });
    }

    const userId = decodeData?.userId;

    const user = await UserModal.findById(userId);

    if (!user) return res.json({ success: false, message: "User not found!" });

    const object = {
        name: user?.name,
        email: user?.email,
        _id: user?.id,
        role: user?.role,
    }

    return res
        .status(200)
        .json({ success: true, user:object });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

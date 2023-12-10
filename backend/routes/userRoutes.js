const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

//@routes   POST /api/users/auth
//@desc     get auth user
//@access   Private
router.get("/auth", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "server error" });
  }
});

//@routes   POST /api/users/register
//@desc     register user
//@access   Public
router.post(
  "/register",
  [
    check("name", "name is required").notEmpty(),
    check("email", "email is required").notEmpty(),
    check("email", "email is not valid").isEmail(),
    check("password", "password is required").notEmpty(),
    check("password", "password should be min 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: false, error: errors.array()[0].msg });
      }

      let { name, email, password } = req.body;

      //user exist
      const userExist = await User.findOne({ email });

      if (userExist) {
        return res
          .status(400)
          .json({ success: false, error: "user is already exists!" });
      }

      let salt = await bcrypt.genSalt(10);

      let hashPassword = await bcrypt.hash(password, salt);

      let newUser = new User({ name, email, password: hashPassword });

      await newUser.save();

      return res
        .status(200)
        .json({ success: true, message: "User register successfully!" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, error: "server error" });
    }
  }
);

//@routes   POST /api/users/login
//@desc     Login user
//@access   Public
router.post(
  "/login",
  [
    check("email", "email is required").notEmpty(),
    check("email", "email is not valid").isEmail(),
    check("password", "password is required").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: false, error: errors.array()[0].msg });
      }

      let { email, password } = req.body;

      //user exist
      const userExist = await User.findOne({ email });

      if (!userExist) {
        return res
          .status(400)
          .json({ success: false, error: "user is not exists!" });
      }

      let passwordComapre = await bcrypt.compare(password, userExist.password);

      if (!passwordComapre) {
        return res
          .status(400)
          .json({ success: false, error: "wrong password" });
      }

      let payload = {
        user: {
          id: userExist.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({ success: true, token });
        }
      );
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, error: "server error" });
    }
  }
);

module.exports = router;

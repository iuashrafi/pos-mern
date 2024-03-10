const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const { JWT_SECRET_KEY } = process.env;
/**
 * @desc - create new user/organization
 */
router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  // some basic backend validations
  if (name && email && password && password === confirmPassword) {
    try {
      const newUser = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(422).json({ errorMessage: "Error creating new user", error });
    }
  } else {
    res.status(500).json({ errorMessage: "Something went wrong!" });
  }
});

/**
 * @desc Login a user
 */
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        // if user does not exists return with error 404
        return res.status(404).json({ message: "User not found" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Generate JWT token
      const token = jwt.sign(
        { name: user.name, userId: user._id, email: user.email },
        JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      // Save the token as a cookie
      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 3600000,
        })
        .status(200)
        .json({ name: user.name, _id: user._id, email: user.email });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(500).json({ errorMessage: "Validation error!" });
  }
});

router.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  console.log("inside profile, cookies=", req.cookies);
  if (token) {
    jwt.verify(token, JWT_SECRET_KEY, {}, async (err, userData) => {
      if (err) throw err;
      let { name, email, _id, owner_id, role } = await User.findById(
        userData.userId
      );
      if (!owner_id) {
        // if owner_id is null that means current user is the owner/admin
        owner_id = _id;
      }
      res.json({ name, email, _id, owner_id, role });
    });
  } else {
    res.json(null);
  }
});
module.exports = router;

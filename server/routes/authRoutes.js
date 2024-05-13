const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const verifyToken = require("../middlewares/verifyToken");
const { JWT_SECRET_KEY } = process.env;
/**
 * @desc - create new user/organization
 */
router.post("/register", verifyToken, async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    user_role,
    isEditingAccount,
  } = req.body;

  // some basic backend validations
  if (!name || !email || !password || !confirmPassword || !user_role) {
    res.status(400).json({ errorMessage: "Missing data" });
  } else if (password !== confirmPassword) {
    res.status(400).json({ errorMessage: "Passwords do not match" });
  }

  try {
    const userData = {
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    };

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).json({ errorMessage: "Email already exists" });
    }

    // check if sub-account is being created
    if (user_role && req.decodedToken) {
      userData.user_role = user_role;
      userData.owner_id = req.decodedToken.userId;
    }

    // if (isEditingAccount === true) {
    //   // sub account is being edited
    // } else {
    // new account or subAccount is being created
    const newUser = await User.create(userData);
    res.status(201).json(newUser);
    // }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
});

/**
 * @desc Updating a subaccount
 */
router.put("/update", verifyToken, async (req, res) => {
  const { name, user_role, email, subaccountId } = req.body;

  // some basic backend validations
  if (!name || !email || !user_role) {
    return res.status(400).json({ errorMessage: "Missing data" });
  }

  try {
    const existingSubaccount = await User.findOne({
      _id: subaccountId,
      owner_id: req.decodedToken.userId,
    });

    if (!existingSubaccount) {
      return res.status(404).json({ errorMessage: "Subaccount not found" });
    }
    // Update  details
    existingSubaccount.name = name;
    existingSubaccount.email = email;
    existingSubaccount.user_role = user_role;

    await existingSubaccount.save();

    res.status(200).json(existingSubaccount);
  } catch (error) {
    res.status(500).json({ errorMessage: "internal server error" });
  }
});

/**
 * @desc Delete a subaccount(isDeleted = true)
 */
router.put("/delete", verifyToken, async (req, res) => {
  const { subaccountId } = req.body;

  if (!subaccountId) {
    return res.status(400).json({ errorMessage: "Something went wrong" });
  }

  try {
    const existingSubaccount = await User.findOne({
      _id: subaccountId,
      owner_id: req.decodedToken.userId,
    });

    if (!existingSubaccount) {
      return res.status(404).json({ errorMessage: "Subaccount not found" });
    }
    // mark the subaccount as deleted
    existingSubaccount.isDeleted = true;

    await existingSubaccount.save();

    res.status(200).json(existingSubaccount);
  } catch (error) {
    res.status(500).json({ errorMessage: "internal server error" });
  }
});

/**
 * @desc Change sub account password
 */
router.put("/password", verifyToken, async (req, res) => {
  const { subaccountId, oldPassword, newPassword, confirmPassword } = req.body;

  // Basic backend validations
  if (!subaccountId || !oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ errorMessage: "Missing data" });
  } else if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ errorMessage: "New password and confirm password do not match" });
  }

  try {
    // Fetch the sub-account by ID
    const subAccount = await User.findOne({
      _id: subaccountId,
      owner_id: req.decodedToken.userId,
    });

    if (!subAccount) {
      return res.status(404).json({ errorMessage: "Sub account not found" });
    }

    // Verify old password
    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      subAccount.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ errorMessage: "Invalid old password" });
    }

    // Validate new password
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ errorMessage: "New passwords do not match" });
    }

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));

    // Update sub account's password
    subAccount.password = hashedPassword;

    // Save the updated sub account
    await subAccount.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
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
      let { name, email, _id, owner_id, user_role } = await User.findById(
        userData.userId
      );
      if (!owner_id) {
        // if owner_id is null that means current user is the owner/admin
        owner_id = _id;
      }
      res.json({ name, email, _id, owner_id, user_role });
    });
  } else {
    res.json(null);
  }
});

/**
 * @desc Logout a user
 */
router.post("/logout", (req, res) => {
  // clear the auth token
  res.clearCookie("token");

  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;

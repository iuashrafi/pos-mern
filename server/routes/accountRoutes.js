const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

/**
 * @desc  get list of all the accounts under current organisation
 */

router.get("/:user_id", async (req, res) => {
  try {
    const currentUser = req.params.user_id;
    const accounts = await User.find({ owner_id: currentUser });

    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ errorMessage: "Error fetching accounts" });
  }
});
module.exports = router;

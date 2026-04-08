const express = require("express");
const router = express.Router();
const {isAuthenticated, isAdmin, isManager, isAttendant} = require("../middleware/auth")

const Tyre = require("../models/TyreRegistration");

router.get("/tyreServices", (req, res) => {
  res.render("tyre");
});

router.post("/tyreServices", async (req, res) => {
  console.log("reached here");
  try {
    const newTyre = new Tyre(req.body);
    console.log(newTyre);
    await newTyre.save();
    res.redirect("/tyreServices");
  } catch (error) {
    console.error(error);
    res.render("tyre");
  }
});

module.exports = router;
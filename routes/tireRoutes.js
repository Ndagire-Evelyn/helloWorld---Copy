const express = require("express");
const router = express.Router();
const {isAuthenticated, isAdmin, isManager, isAttendant} = require("../middleware/auth")

const Tire = require("../models/TireTransaction");

router.get("/tireServices", (req, res) => {
  res.render("tire");
});

router.post("/tireServices", async (req, res) => {
  console.log("reached here");
  try {
    const newTire = new Tire(req.body);
    console.log(newTire);
    await newTire.save();
    res.redirect("/tireServices");
  } catch (error) {
    console.error(error);
    res.render("tire");
  }
});

module.exports = router;
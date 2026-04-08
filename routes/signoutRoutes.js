const express = require("express");
const router = express.Router();
const calculateParkingFee = require("../utils/feeCalculator");

//import models
const Vehicles = require("../models/Vehicle_registration")
const Signout = require("../models/Signout")

router.get("/signout", (req, res) => {
    res.render("signout");
});

router.post("/signout/verify", async (req, res) => {
    try {
        const Vehicle = await Vehicle.findOne({receiptNumber:req.body.receiptNumber, status:"Parked"})
        if(!Vehicle){
            return res.render("signout")
        }
        const fee = calculateParkingFee(Vehicle.vehicleType, Vehicle.arrivalTime)
        res.render("signoutConfirm", {Vehicle,fee})
    } catch (error) {
        res.render("signout");
    }
});

router.post("/signout/confirm", async (req, res) => {
    try {
        const newSignout = new Signout(req.body)
        const savedSignout = await newSignout.save();
        await Vehicle.findByIdAndUpdate({receiptNumber: req.body.vehicleId,status:"Signed-out"})
        res.redirect(`/signout/receipt/:${savedSignout._id}`)
    } catch (error) {
        res.render("signout");
    }
});

router.post("/signout/receipt/:id", async (req, res) => {
    try {
        const record = await Signout.findById(req.params.id).populate("vehicleId")
        if(!record)
         return res.redirect("/signout")
         res.render("receipt", {record})
    } catch (error) {
        res.render("signout");
    }
});







module.exports = router;
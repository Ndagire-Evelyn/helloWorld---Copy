//Ensure user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}
//Check if a logged in user is an Admin
const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "Admin") {
       return next();
    }
    res.status(403).send("Access denined: You are not admin")
}
const isManager = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "Manager") {
       return next();
    }
    res.status(403).send("Access denined: You are not the manager")
}
const isAttendant = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "Attendant") {
        return next();
    }
    res.status(403).send("Access denined: You are not the attendant")
}
module.exports = {isAuthenticated, isAdmin, isManager, isAttendant};
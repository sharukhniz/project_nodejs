const express = require("express");
const router = express.Router();
const services = require("../Controller/pageController");
const controller = require("../Controller/employeeController");
const authentication = require("../Controller/authenticationController");
/**
 * @description root route
 * @method get/
 */
// router.get("/", services.homePage);
router.get("/view/", services.viewPage);

router.get("/login", services.loginPage);
router.post("/login", authentication.login);

router.get("/signup", services.signupPage);
router.post("/signup", authentication.signup);

router.get("/logout", authentication.logout);

const { isAuthenticated } = require("../Services/authMiddleware");

// get render home page
router.get("/", isAuthenticated, services.homePage);

// API
router.post("/api/employees", controller.create);
router.get("/api/employees", controller.find);
router.put("/api/employees/:id", controller.update);
router.delete("/api/employees/:id", controller.delete);

router.get("/api/employees/search", controller.search);

module.exports = router;

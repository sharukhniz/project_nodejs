const express = require("express");
const router = express.Router();
const services = require("../Services/render");
const controller = require("../Controller/controller");
const auth_controller = require("../Controller/auth_controller");
/**
 * @description root route
 * @method get/
 */
// router.get("/", services.homeRoutes);
router.get("/view/", services.viewRoutes);

router.get("/login", services.loginRoutes);
router.post("/login", auth_controller.login);

router.get("/signup", services.signupRoutes);
router.post("/signup", auth_controller.signup);

router.get("/logout", auth_controller.logout);

const { isAuthenticated } = require("../Services/authenticate");

// get render home page
router.get("/", isAuthenticated, services.homeRoutes);

// API
// router.post("/api/employees",auth_controller.create);
router.post("/api/employees", controller.create);
router.get("/api/employees", controller.find);
router.put("/api/employees/:id", controller.update);
router.delete("/api/employees/:id", controller.delete);

router.get("/api/employees/search", controller.search);

module.exports = router;

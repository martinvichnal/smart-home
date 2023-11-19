const express = require("express")
const router = express.Router()
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
} = require("../controller/userController")

// Token Validator
// const validateToken = require("../middleware/validateTokenHandler")
// router.use(validateToken)

// API Routes
router.route("/").get(getUsers).post(createUser) // Normal route
router.route("/user").get(getUser).delete(deleteUser) // Route with query

// Exporting routers
module.exports = router

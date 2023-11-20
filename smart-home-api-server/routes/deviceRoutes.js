const express = require("express")
const router = express.Router()
const {
    getDevices,
    getDevice,
    createDevices,
    updateDevice,
    deleteDevice,
} = require("../controller/deviceController")

// Token Validator
// const validateToken = require("../middleware/validateTokenHandler")
// router.use(validateToken)

// API Routes
router.route("/").get(getDevices).post(createDevices) // Normal route
router.route("/device").get(getDevice).put(updateDevice).delete(deleteDevice) // Route with parameter

// Exporting routers
module.exports = router

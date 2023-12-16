const express = require("express")
const router = express.Router()
const {
    getDevices,
    getDeviceDID,
    getDeviceUID,
    createDevices,
    updateDevice,
    deleteDevice,
} = require("../controller/deviceController")

// Token Validator
// const validateToken = require("../middleware/validateTokenHandler")
// router.use(validateToken)

// API Routes
router.route("/").get(getDevices).post(createDevices) // Normal route
router
    .route("/deviceDID")
    .get(getDeviceDID)
    .put(updateDevice)
    .delete(deleteDevice)
router.route("/deviceUID").get(getDeviceUID)

// Exporting routers
module.exports = router

/*
Routes: 
GET /api/devices - Get all devices
POST /api/devices - Create a device

GET /api/devices/deviceUID?uid={userID} - Get a device by UID

GET /api/devices/deviceDID?did={deviceID} - Get a device by DID
PUT /api/devices/deviceDID - Update a device by DID
DELETE /api/devices/deviceDID - Delete a device by DID

*/

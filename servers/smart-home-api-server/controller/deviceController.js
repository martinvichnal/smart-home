const asyncHandler = require("express-async-handler")
const sql = require("mssql")

/**
 * @description Getting all devices
 * @route GET /api/devices
 * @param NULL
 * @returns data JSON array || status: 200
 * @example http://localhost:1234/api/devices
 * @access public
 */
const getDevices = asyncHandler(async (req, res) => {
    const query = `SELECT * FROM devices;`

    try {
        var request = new sql.Request()
        const result = await request.query(query)
        // res.status(200).json({ success: true, data: result.recordset })
        res.status(200).json(result.recordset)
    } catch (error) {
        res.status(405).json({
            success: false,
            error: error.message,
        })
    }
})

/**
 * @description Getting a device by device id
 * @route GET /api/devices/deviceDID
 * @param ?did={deviceID}
 * @returns data JSON array || status: 200
 * @example http://localhost:1234/api/devices/deviceDID?did=123456789
 * @access public
 */
const getDeviceDID = asyncHandler(async (req, res) => {
    const did = req.query.did
    const query = `SELECT * FROM devices WHERE DID='${did}';`

    try {
        var request = new sql.Request()
        const result = await request.query(query)
        // res.status(200).json({ success: true, data: result.recordset })
        res.status(200).json(result.recordset)
    } catch (error) {
        res.status(405).json({
            success: false,
            error: error.message,
        })
    }
})

/**
 * @description Getting a device by user id
 * @route GET /api/devices/deviceUID
 * @param ?uid={userID}
 * @returns data JSON array || status: 200
 * @example http://localhost:1234/api/devices/deviceUID?did=123456789
 * @access public
 */
const getDeviceUID = asyncHandler(async (req, res) => {
    const uid = req.query.uid
    const query = `SELECT * FROM devices WHERE UID='${uid}';`

    try {
        var request = new sql.Request()
        const result = await request.query(query)
        // res.status(200).json({ success: true, data: result.recordset })
        res.status(200).json(result.recordset)
    } catch (error) {
        res.status(405).json({
            success: false,
            error: error.message,
        })
    }
})

/**
 * @description Creating a device by user id
 * @route POST /api/devices
 * @param body: {did, dn, dd, uid}
 * @returns data JSON array || status: 200
 * @example http://localhost:1234/api/devices
 * @access public
 */
const createDevices = asyncHandler(async (req, res) => {
    const { did, dn, dd, uid } = req.body // Getting the data from the body
    const query = `INSERT INTO devices (DID, DN, DD, UID ) VALUES ('${did}', '${dn}', '${dd}', '${uid}');`
    try {
        var request = new sql.Request()
        const result = await request.query(query)
        // res.status(200).json({ success: true, data: result.recordset })
        res.status(200).json(result.recordset)
    } catch (error) {
        res.status(405).json({
            success: false,
            error: error.message,
        })
    }
})

/**
 * @description Update device data by device id
 * @route PUT /api/devices/deviceDID
 * @param body: {did, dd}
 * @returns data JSON array || status: 200
 * @example http://localhost:1234/api/devices/deviceDID
 * @access public
 */
const updateDevice = asyncHandler(async (req, res) => {
    const { did, dd } = req.body // Getting the data from the body
    const query = `UPDATE devices SET DD='${dd}' WHERE DID='${did}';`

    try {
        var request = new sql.Request()
        const result = await request.query(query)
        // res.status(200).json({ success: true, data: result.recordset })
        res.status(200).json(result.recordset)
    } catch (error) {
        res.status(405).json({
            success: false,
            error: error.message,
        })
    }
})

/**
 * @description Delete device data by device id
 * @route DELETE /api/devices/deviceDID
 * @param body: {did}
 * @returns data JSON array || status: 200
 * @example http://localhost:1234/api/devices/deviceDID
 * @access public
 */
const deleteDevice = asyncHandler(async (req, res) => {
    const { did } = req.body // Getting the data from the body
    const query = `DELETE FROM devices WHERE DID = '${did}';`
    try {
        var request = new sql.Request()
        const result = await request.query(query)
        // res.status(200).json({ success: true, data: result.recordset })\
        res.status(200).json(result.recordset)
    } catch (error) {
        res.status(405).json({
            success: false,
            error: error.message,
        })
    }
})

module.exports = {
    getDevices,
    getDeviceDID,
    getDeviceUID,
    createDevices,
    updateDevice,
    deleteDevice,
}

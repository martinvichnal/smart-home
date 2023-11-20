const asyncHandler = require("express-async-handler")
const sql = require("mssql")

/**
 * @description Getting all devices from the database
 * @route GET /api/devices
 * @param http://{server}/api/devices
 * @returns data JSON array || status: 200
 * @example http://localhost:3000/api/devices
 * @access public
 */
const getDevices = asyncHandler(async (req, res) => {
    const query = "SELECT * FROM devices"
    try {
        var request = new sql.Request()
        const result = await request.query(query)
        res.status(200).json({ success: true, data: result.recordset })
    } catch (error) {
        res.status(405).json({
            success: false,
            error: error.message,
        })
    }
})

/**
 * @description Getting a device from the database by id
 * @route GET /api/devices/device
 * @param http://{server}/api/devices/device?did={device ID}
 * @returns data JSON array || status: 200
 * @example http://localhost:3000/api/devices/device?did=a550b29757374abda73c15d29e2cd1e1
 * @access public
 */
const getDevice = asyncHandler(async (req, res) => {
    const did = req.query.did // Getting the id from the url
    const { didBody } = req.body
    // const { didFromBody } = req.body // Getting the data from the body
    const query = `SELECT * FROM devices WHERE DID='${did}';`
    try {
        var request = new sql.Request()
        const result = await request.query(query)
        res.status(200).json({ success: true, data: result.recordset })
    } catch (error) {
        res.status(405).json({
            success: false,
            error: error.message,
        })
    }
})

/**
 * @description Creating a device from the database
 * @route PUT /api/devices/device
 * @param http://{server}/api/devices/device?did={device ID}
 * @returns data JSON array || status: 200
 * @example http://localhost:3000/api/devices/device?did=a550b29757374abda73c15d29e2cd1e1
 * @access public
 */
const createDevices = asyncHandler(async (req, res) => {
    const { did, dn, dd, uid } = req.body // Getting the data from the body
    const query = `INSERT INTO devices (DID, DN, DD, UID ) VALUES ('${did}', '${dn}', '${dd}', '${uid}');`
    try {
        var request = new sql.Request()
        const result = await request.query(query)
        res.status(200).json({ success: true, data: result.recordset })
    } catch (error) {
        res.status(405).json({
            success: false,
            error: error.message,
        })
    }
})

/**
 * @description Updating a device from the database
 * @route POST /api/devices/device
 * @param http://{server}/api/devices/device?did={device ID}
 * @returns data JSON array || status: 200
 * @example http://localhost:3000/api/devices/device?did=a550b29757374abda73c15d29e2cd1e1
 * @access public
 */
const updateDevice = asyncHandler(async (req, res) => {
    const { did, dd } = req.body // Getting the data from the body
    const query = `UPDATE devices SET DD='${dd}' WHERE DID='${did}';`

    try {
        var request = new sql.Request()
        const result = await request.query(query)
        res.status(200).json({ success: true, data: result.recordset })
    } catch (error) {
        res.status(405).json({
            success: false,
            error: error.message,
        })
    }
})

/**
 * @description Deleting a device from the database
 * @route DELETE /api/devices/device
 * @param http://{server}/api/devices/device?did={device ID}
 * @returns data JSON array || status: 200
 * @example http://localhost:3000/api/devices/device?did=a550b29757374abda73c15d29e2cd1e1
 * @access public
 */
const deleteDevice = asyncHandler(async (req, res) => {
    const { did } = req.body // Getting the data from the body
    const query = `DELETE FROM devices WHERE DID = '${did}';`
    try {
        var request = new sql.Request()
        const result = await request.query(query)
        res.status(200).json({ success: true, data: result.recordset })
    } catch (error) {
        res.status(405).json({
            success: false,
            error: error.message,
        })
    }
})

module.exports = {
    getDevices,
    getDevice,
    createDevices,
    updateDevice,
    deleteDevice,
}

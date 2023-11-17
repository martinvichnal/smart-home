"use client"
import React, { useState, useEffect } from "react"

const DeviceBox = ({ device }) => {
    const [values, setValues] = useState({})

    useEffect(() => {
        const initialValues = {}
        device.dd.split("--").forEach((item) => {
            if (item) {
                const [name, type, ...params] = item.split("-")
                initialValues[name] = params[params.length - 1]
            }
        })
        setValues(initialValues)
        console.log("Initial Values:", initialValues)
    }, [device.dd])

    useEffect(() => {
        // console.log("Current Values:", values)
        console.log(device.did, values)
        // SENDING VALUESQ TO THE SERVER
    }, [values])

    // Updating the values object
    const handleInputChange = (name, value) => {
        // console.log(`Updating ${name} to:`, value)
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
    }

    // Rendering out the corresponding component based on the variable type
    const renderComponents = (name, type, ...params) => {
        switch (type) {
            case "n":
                const [min, max] = params
                return (
                    <div key={name} className="mb-4">
                        <label className="text-sm font-medium">{name}</label>
                        <input
                            type="number"
                            name={name}
                            value={values[name] || ""}
                            min={min}
                            max={max}
                            disabled={name === "battery"}
                            onChange={(e) =>
                                handleInputChange(name, e.target.value)
                            }
                            className="border p-2 rounded-md w-full"
                        />
                    </div>
                )
            case "b":
                return (
                    <div key={name} className="mb-4">
                        <label className="text-sm font-medium m-4">
                            {/* {name.charAt(0).toUpperCase() + name.slice(1)} */}
                            {name}
                        </label>
                        {values[name] ? (
                            <button
                                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                                onClick={() =>
                                    handleInputChange(name, !values[name])
                                }
                            >
                                {name}
                            </button>
                        ) : (
                            <button
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                                onClick={() =>
                                    handleInputChange(name, !values[name])
                                }
                            >
                                {name}
                            </button>
                        )}
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="m-6 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {device.dn}
            </h2>
            <div className="p-6 grid grid-cols-3 gap-4 grid-flow-row justify-center items-center">
                {device.dd.split("--").map((item) => {
                    if (item) {
                        const [name, type, ...params] = item.split("-")
                        return renderComponents(name, type, ...params)
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default DeviceBox

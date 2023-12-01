"use client"

import React, { useState, useEffect } from "react"
import setDeviceData from "@/lib/setDeviceData"
import axios from "axios"

/*
got device prop:
{
    "DID": "05b31779-14ee-4233-8c9a-2749e81d3ccb",
    "DN": "Thermostat",
    "DD": "temperature-n-0-100-34--humidity-n-0-100-61--state-b-0-0-0--",
    "UID": "80ff2b60-bf4b-42fe-8de4-d21734a393c8"
}

properties:
[
    "temperature-n-0-100-34",
    "humidity-n-0-100-61",
    "state-b-0-0-0",
    ""
]
*/

function parseDeviceDataString(deviceDataString) {
    const properties = deviceDataString
        .split("--")
        .filter((property) => property)

    let deviceData = {}
    properties.forEach((property) => {
        const [name, type, min, max, value] = property.split("-")
        let v
        if (type === "b") {
            if (value === "0" || value.toLowerCase() === "false") {
                v = false
            } else if (value === "1" || value.toLowerCase() === "true") {
                v = true
            }
        } else if (type === "n") {
            v = Number(value)
        }

        deviceData[name] = {
            type,
            min: Number(min),
            max: Number(max),
            value: v,
        }
    })
    return deviceData
}

function stringifyDeviceData(deviceData) {
    let properties = []
    Object.keys(deviceData).forEach((name) => {
        let { type, min, max, value } = deviceData[name]
        let propertyString = [name, type, min, max, value].join("-")
        properties.push(propertyString)
    })
    return properties.join("--")
}

export default function DeviceBox({ device, onDeviceChange }) {
    const [values, setValues] = useState(parseDeviceDataString(device.DD))
    const [fetchData, setFetchData] = useState(false)

    useEffect(() => {
        const initialValues = parseDeviceDataString(device.DD)
        setValues(initialValues)
        console.log("Initial Values:", initialValues)
    }, [device.DD])

    useEffect(() => {
        const updateDeviceData = async () => {
            const deviceDataString = stringifyDeviceData(values)
            try {
                const response = await axios.put(
                    "http://192.168.0.53:8080/api/devices/deviceDID",
                    {
                        did: device.DID,
                        dd: deviceDataString + "--",
                    }
                )
                console.log("Data fetched... ", response)
                setFetchData(true)
            } catch (error) {
                console.log("ERROR - ", error)
            }
            setFetchData(false)
        }

        updateDeviceData()
    }, [values])

    useEffect(() => {
        console.log("Fetch Data:", fetchData)
        onDeviceChange(device.DID)
    }, [fetchData])

    // Updating the values object
    const handleInputChange = (variableName, variableNewValue) => {
        setValues((prevValues) => ({
            ...prevValues,
            [variableName]: {
                ...prevValues[variableName],
                value: variableNewValue,
            },
        }))
    }

    // Rendering out the corresponding component based on the variable type
    const renderComponents = (name, type, min, max, value) => {
        switch (type) {
            case "n":
                return (
                    <div key={name} className="mb-4">
                        <label className="text-sm font-medium">{name}</label>
                        <input
                            type="number"
                            name={name}
                            value={values[name].value || ""}
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
                        <h1 className="text-sm font-medium">
                            {values[name].value}
                        </h1>
                        <label className="text-sm font-medium m-4">
                            {name}
                        </label>
                        {values[name].value ? (
                            <button
                                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                                onClick={() =>
                                    handleInputChange(name, !values[name].value)
                                }
                            >
                                {name}
                            </button>
                        ) : (
                            <button
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                                onClick={() =>
                                    handleInputChange(name, !values[name].value)
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
            <h2 className="pb-8 text-2xl font-bold tracking-tight text-gray-900">
                {device.DN}
            </h2>
            <div className="grid grid-cols-2 gap-8 justify-start">
                {device.DD.split("--").map((item) => {
                    if (item) {
                        const [name, type, min, max, value] = item.split("-")
                        return renderComponents(name, type, min, max, value)
                    }
                    return null
                })}
            </div>
        </div>
    )
}

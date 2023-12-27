"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { on } from "events"

import { useEffect, useState } from "react"

interface deviceType {
    DID: string
    DN: string
    DD: string
    UID: string
}

interface deviceVariableType {
    name: string
    type: string
    min: number
    max: number
    value: number
}

interface DeviceBoxProps {
    DID: string
    DN: string
    DD: string
    UID: string
    // onDeviceChange: (data: deviceType) => void
}

function parseDeviceData(deviceData: string): deviceVariableType[] {
    const deviceVariables = deviceData.split("--").filter(Boolean) // Split by '--' and remove empty strings
    return deviceVariables.map((deviceVariables) => {
        const [name, type, min, max, value] = deviceVariables.split("-")
        return {
            name,
            type,
            min: Number(min),
            max: Number(max),
            value: Number(value),
        }
    })
}

// Stringify device data
function stringifyDeviceData(deviceVariables: deviceVariableType[]): string {
    return deviceVariables
        .map(
            (deviceVariable) =>
                `${deviceVariable.name}-${deviceVariable.type}-${deviceVariable.min}-${deviceVariable.max}-${deviceVariable.value}`
        )
        .join("--")
}

export default function DeviceBox({ DID, DN, DD, UID }: DeviceBoxProps) {
    // Storing device variables
    const [deviceVariables, setDeviceVariables] = useState<
        deviceVariableType[]
    >([])

    // Handle Device Data changes
    useEffect(() => {
        // parse device string and setting
        console.log("device.DD: " + DD)
        const paresdDeviceVariables = parseDeviceData(DD)
        setDeviceVariables(paresdDeviceVariables)
    }, [DD])

    // Handle variable changes
    useEffect(() => {
        // stringify device string and setting
        const stringifiedDeviceVariables = stringifyDeviceData(deviceVariables)
        console.log(
            "Sending to server...:" + DID + " " + stringifiedDeviceVariables
        )
        // onDeviceChange({ ...device, DD: stringifiedDeviceVariables })
    }, [deviceVariables])

    // Setting the new value of the variable in the state
    const handleVariableChange = (
        variableName: string,
        newVariable: string
    ) => {
        // Change the prev value to new value in the deviceVariable state
        setDeviceVariables((prevVariables) => {
            return prevVariables.map((variable) => {
                if (variable.name === variableName) {
                    return { ...variable, value: Number(newVariable) }
                }
                return variable
            })
        })
    }

    return (
        <div className="m-6 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
            <p>Device name: {DN}</p>
            <p>Device ID: {DID}</p>
            <p>Device user ID: {UID}</p>
            <p>Device variables:</p>
            {deviceVariables.map((variable) => (
                <div key={variable.name}>
                    <p>{variable.name}</p>
                    <Button
                        onClick={(value) => {
                            handleVariableChange(
                                variable.name,
                                variable.value.toString()
                            )
                        }}
                    >
                        {variable.name}
                    </Button>
                </div>
            ))}
        </div>
    )
}

{
    /* {variable.type === "b" ? (
                        <Switch
                            name={variable.name}
                            defaultValue={variable.value}
                            onChange={(value) => {
                                handleVariableChange(
                                    variable.name,
                                    value.toString()
                                )
                            }}
                            // checked={variable.value === 1}
                        />
                    ) : (
                        <Slider
                            name={variable.name}
                            onDragEnd={(value) => {
                                handleVariableChange(
                                    variable.name,
                                    value.toString()
                                )
                            }}
                            defaultValue={[variable.value]}
                            max={variable.max}
                            min={variable.min}
                            step={1}
                        />
                    )} */
}

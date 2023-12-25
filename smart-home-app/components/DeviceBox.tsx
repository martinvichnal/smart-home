"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { on } from "events"

import { useEffect, useState } from "react"

type deviceType = {
    DID: string
    DN: string
    DD: string
    UID: string
}

type DeviceBoxProps = {
    device: deviceType
    onDeviceChange: deviceType
}

type deviceVariableType = {
    name: string
    type: string
    min: number
    max: number
    value: number
}

function parseDeviceData(deviceData: string): deviceVariableType[] {
    const deviceVariables = deviceData.split("--").filter(Boolean) // Split by '--' and remove empty strings
    return deviceVariables.map((deviceVariables) => {
        const [name, type, min, max, value] = deviceVariables.split("-")
        console.log(
            "paresd informations:" +
                "name: " +
                name +
                " type: " +
                type +
                " min: " +
                min +
                " max: " +
                max +
                " value: " +
                value
        )
        return {
            name,
            type,
            min: Number(min),
            max: Number(max),
            value: Number(value),
        }
    })
}

export default function DeviceBox(
    { DID, DN, DD, UID }: deviceType,
    onDeviceChange: deviceType
) {
    const [deviceVariables, setDeviceVariables] = useState<
        deviceVariableType[]
    >([])

    useEffect(() => {
        // parse device string and setting
        const paresdDeviceVariables = parseDeviceData(DD)
        setDeviceVariables(paresdDeviceVariables)
    }, [])

    // Handle Device Data changes
    useEffect(() => {}, [DD])

    const handleVariableChange = (DD: string) => {
        // Handle changes in the devices
        // This is used to update the devices list when a new device is added or removed
        // console.log(value)
        onDeviceChange({ DID, DN, DD, UID })
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
                    {variable.type === "b" ? (
                        <Switch
                            defaultValue={variable.value}
                            onChange={(value) => {
                                handleVariableChange(value.toString())
                            }}
                            // checked={variable.value === 1}
                        />
                    ) : (
                        <Slider
                            onChange={(value) => {
                                handleVariableChange(value.toString())
                            }}
                            defaultValue={[variable.value]}
                            max={variable.max}
                            min={variable.min}
                            step={1}
                        />
                    )}
                </div>
            ))}
            <Button>Submit</Button>
        </div>
    )
}

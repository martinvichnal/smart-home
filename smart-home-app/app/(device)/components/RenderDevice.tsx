/*
This is where the device will render.
Server component.
Responsible for getting asynchronus data from the database.
*/

"use client"

import { useEffect, useState } from "react"
import RenderVariable from "./RenderVariable"
import { RenderDeviceProps, DeviceVariableInterface } from "@/lib/interfaces"

export default function RenderDevice({
    did,
    dn,
    dd,
    uid,
    onDeviceChange,
}: RenderDeviceProps) {
    const [deviceVariables, setDeviceVariables] = useState<
        DeviceVariableInterface[]
    >([]) // State for storing device variables in array

    // // Handle Device Data changes
    useEffect(() => {
        // parse device string and setting
        // console.log("device.DD: " + dd)
        const paresdDeviceVariables = parseDeviceData(dd)
        setDeviceVariables(paresdDeviceVariables)
    }, [dd])

    // Handle Device Variable changes
    const onVariableChange = (name: string, value: number) => {
        // Update the device variable
        const updatedDeviceVariables = deviceVariables.map((deviceVariable) => {
            if (deviceVariable.name === name) {
                return { ...deviceVariable, value }
            }
            return deviceVariable
        })
        setDeviceVariables(updatedDeviceVariables)
        // Update the device data
        const updatedDeviceData = stringifyDeviceData(updatedDeviceVariables)
        onDeviceChange(updatedDeviceData)
    }

    return (
        <div className="m-6 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="pb-6">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    {dn}
                </h2>
                <div className="flex gap-6">
                    <p className="text-base text-gray-300">Device {did}</p>
                    <p className="text-base text-gray-300">User {uid}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 justify-start">
                {deviceVariables.map(
                    (deviceVariable: DeviceVariableInterface) => (
                        <RenderVariable
                            key={deviceVariable.name}
                            name={deviceVariable.name}
                            type={deviceVariable.type}
                            min={deviceVariable.min}
                            max={deviceVariable.max}
                            value={deviceVariable.value}
                            onDeviceVariableChange={onVariableChange}
                        />
                    )
                )}
                {/* <RenderVariable /> */}
            </div>
        </div>
    )
}

// Parse device data
function parseDeviceData(deviceData: string): DeviceVariableInterface[] {
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
function stringifyDeviceData(
    deviceVariables: DeviceVariableInterface[]
): string {
    return deviceVariables
        .map(
            (deviceVariable) =>
                `${deviceVariable.name}-${deviceVariable.type}-${deviceVariable.min}-${deviceVariable.max}-${deviceVariable.value}`
        )
        .join("--")
}

/*
This is where the device will render.
Server component.
Responsible for getting asynchronus data from the database.
*/

"use client"

import { Chip, Divider, Tooltip } from "@nextui-org/react"
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
    >(parseDeviceData(dd))

    useEffect(() => {
        const stringifiedDeviceVariables = stringifyDeviceData(deviceVariables)
        onDeviceChange({ did, dn, dd: stringifiedDeviceVariables, uid })
    }, [deviceVariables])

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
    }

    return (
        <div className="m-6 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="pb-6">
                <div className="flex gap-6">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        {dn}
                    </h2>
                    <Tooltip content="The device is online at the moment">
                        <Chip color="success" variant="flat" size="sm">
                            Online
                        </Chip>
                    </Tooltip>
                    <Tooltip content="The device is offline at the moment">
                        <Chip color="danger" variant="flat" size="sm">
                            Offline
                        </Chip>
                    </Tooltip>
                </div>
                <div className="flex gap-6">
                    <p className="text-base text-gray-300">Device {did}</p>
                    <p className="text-base text-gray-300">User {uid}</p>
                </div>
                <Divider className="m-2" />
            </div>
            <div className="grid grid-cols-1 gap-6">
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

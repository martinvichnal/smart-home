/*
This renders each variable.
Client component.
Responsible controlling the variables in user client.
*/

"use client"
import { RenderDeviceVariableProps } from "@/lib/interfaces"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export default function RenderVariable({
    name,
    type,
    min,
    max,
    value,
    onDeviceVariableChange,
}: RenderDeviceVariableProps) {
    const handleVariableChange = (name: string, value: string) => {
        // onDeviceVariableChange(name, value)
        console.log("name: " + name)
        console.log("value: " + value)
    }

    return (
        <div className="">
            {type === "b" ? (
                <Switch
                    name={name}
                    defaultValue={[value.toString()]}
                    onChange={(e: any) =>
                        handleVariableChange(name, e.target.value)
                    }
                    // checked={variable.value === 1}
                />
            ) : (
                <Slider
                    name={name}
                    onDragEnd={(value) => {
                        handleVariableChange(name, value.toString())
                    }}
                    // defaultValue={value}
                    defaultValue={[Number(value)]}
                    max={max}
                    min={min}
                    step={1}
                />
            )}
        </div>
    )
}

/*
This renders each variable.
Client component.
Responsible controlling the variables in user client.
*/

"use client"

import { RenderDeviceVariableProps } from "@/lib/interfaces"

import { Button, Slider } from "@nextui-org/react"
import { useState, useEffect } from "react"

export default function RenderVariable({
    name,
    type,
    min,
    max,
    value,
    onDeviceVariableChange,
}: RenderDeviceVariableProps) {
    const handleVariableChange = (name: string, value: number | boolean) => {
        // console.log(name, value)
        onDeviceVariableChange(name, value)
    }

    switch (type) {
        case "b":
            return (
                <Button
                    color={value === 1 ? "success" : "danger"}
                    radius="sm"
                    onClick={() =>
                        handleVariableChange(name, value === 1 ? 0 : 1)
                    }
                    defaultValue={String(value)}
                >
                    {name}
                </Button>
            )

        case "n":
            return (
                <Slider
                    color="foreground"
                    size="md"
                    step={1}
                    maxValue={max}
                    minValue={min}
                    aria-label={name}
                    defaultValue={value}
                    className="max-w-md"
                    onChange={(value) =>
                        handleVariableChange(name, Number(value))
                    }
                />
            )
        default:
            return <></>
    }
}

// return (
//     <div className="">
//         {type === "b" ? (
//             <Button
//                 onClick={() => handleVariableChange(name, valueState)}
//                 defaultValue={String(value)}
//             >
//                 {name}
//             </Button>
//         ) : (
//             <Slider
//                 size="md"
//                 step={1}
//                 maxValue={max}
//                 minValue={min}
//                 aria-label={name}
//                 defaultValue={value}
//                 className="max-w-md"
//                 onChange={(value) =>
//                     handleVariableChange(name, Number(value))
//                 }
//             />
//         )}
//     </div>
// )

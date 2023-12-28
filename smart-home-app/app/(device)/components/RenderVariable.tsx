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
    const handleVariableChange = (name: string, value: number) => {
        onDeviceVariableChange(name, value)
    }

    switch (type) {
        case "b":
            if (value === 1) {
                return (
                    <Button
                        color="success"
                        onClick={() => handleVariableChange(name, value)}
                        defaultValue={String(value)}
                    >
                        {name}
                    </Button>
                )
            } else if (value === 0) {
                return (
                    <Button
                        color="danger"
                        onClick={() => handleVariableChange(name, value)}
                        defaultValue={String(value)}
                    >
                        {name}
                    </Button>
                )
            }

        case "n":
            return (
                <Slider
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

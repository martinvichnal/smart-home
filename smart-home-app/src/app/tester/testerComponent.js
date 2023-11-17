"use client"

import React, { useState, useEffect } from "react"
import io from "socket.io-client"

export default function TesterComponent(props) {
    const socket = io("http://localhost:3001")

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected :", socket.id)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return <div>testerComponent</div>
}

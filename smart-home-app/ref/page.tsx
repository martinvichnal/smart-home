// "use client"

// import { getAllDevices } from "@/actions/getAllDevices"
// import DeviceBox from "@/components/DeviceBox"
// // import { unstable_noStore as noStore } from "next/cache"1

// import { Suspense, useEffect, useState } from "react"
// import io from "socket.io-client"

// interface deviceType {
//     DID: string
//     DN: string
//     DD: string
//     UID: string
// }

// export default function Home() {
//     const [devices, setDevices] = useState<deviceType[]>([]) // State for storing devices in array

//     // Getting all devices from the database via GET request

//     // const handleChanges = (data: deviceProps) => {
//     //     // Handle changes in the devices
//     //     // This is used to update the devices list when a new device is added or removed
//     //     setDevices((prevDevices) => [...prevDevices, data])
//     // }

//     useEffect(() => {
//         // Fetching devices
//         const getDevices = async () => {
//             console.log(`${process.env.API_SERVER_IP}/api/devices`)
//             const devices = await getAllDevices()
//             setDevices(devices)
//             console.log(devices)
//         }
//         getDevices()

//         // // Connecting to websocket and handling messages events
//         // const socket = io("ws://192.168.0.28:5000")

//         // socket.on("connect", () => {
//         //     console.log("Successfully connected to the WebSocket server!")
//         // })

//         // socket.on("disconnect", () => {
//         //     console.log("Disconnected from the WebSocket server!")
//         // })

//         // // Listen for incoming messages
//         // socket.on("webMessage", (message) => {
//         //     // Handle messages from the device
//         //     // setMessages((prevMessages) => [...prevMessages, message])
//         // })

//         // socket.on("ackMessage", (message) => {
//         //     // Handle messages on acknowledgement from the device
//         //     // This is used to check if the device is recived the message or not
//         //     // setMessages((prevMessages) => [...prevMessages, message])
//         // })

//         // // Clean up the socket connection on unmount
//         // return () => {
//         //     socket.disconnect()
//         // }
//     }, [])

//     return (
//         <div className="" id="devices">
//             <div className="flex flex-wrap lg:justify-evenly md:justify-evenly sm:justify-center text-black">
//                 <Suspense fallback={<div>Loading...</div>}>
//                     {devices.map((device: deviceType) => (
//                         <DeviceBox
//                             key={device.DID}
//                             DID={device.DID}
//                             DN={device.DN}
//                             DD={device.DD}
//                             UID={device.UID}
//                             // onDeviceChange={handleChanges}
//                         />
//                     ))}
//                 </Suspense>
//             </div>
//         </div>
//     )
// }

type deviceProps = {
    DID: string
    DN: string
    DD: string
    UID: string
}

type deviceDataProps = {
    name: string
    type: string
    min: number
    max: number
    value: number
}

function parseDeviceData(deviceData: string): deviceDataProps[] {
    const deviceVariables = deviceData.split("--").filter(Boolean) // Split by '--' and remove empty strings
    console.log("devicVariables: " + deviceVariables)
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

export default function DeviceBox({ DID, DN, DD, UID }: deviceProps) {
    // parse device string
    const deviceData = parseDeviceData(DD)
    console.log("deviceData: " + deviceData)

    return (
        <div className="m-6 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div key={DID}>
                <p>{DID}</p>
                <p>{DN}</p>
                <p>{DD}</p>
                <p>{UID}</p>
            </div>
        </div>
    )
}

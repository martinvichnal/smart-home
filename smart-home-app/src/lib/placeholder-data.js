// Possible data type? for exmaple what is the max and min value of some value.

// dt: data type codes:
// This is the data type structure:
// {name}"-"{type}"-"{min}"-"{max}"--"
// Every variable end with "--" and the last variable doesn't have "--"

// Example:
// The device has two number variable that can be 0-100 and 0-255
// name: brightness, type: number, boundaries: 0-100, --> brightness-n-0-100
// name: color, type: number, boundaries: 0-255, --> color-n-0-255
// So the whole type will be like:
// brightness-n-0-100--color-n-0-255

// possible data types:
// number: "n"
// boolean: "b"
// string: "s"

// Shoulb be have some extra information for example increment:
// brightness-n-0-100-1--color-n-0-255-1
// This means that the brightness and color can be incremented by 1

// Example data
export const data = [
    {
        DID: "05b31779-14ee-4233-8c9a-2749e81d3ccb",
        DN: "Thermostat",
        DD: "temperature-n-0-100-34--humidity-n-0-100-61--state-b-0-0-0--",
        UID: "80ff2b60-bf4b-42fe-8de4-d21734a393c8",
    },
    // {
    //     DID: "08659bb5de53e40c48b07ab90b25d29e4",
    //     DN: "Kitchen Switcher Hub",
    //     DD: "Power-b-false--battery-n-0-100-19.6--Air Conditioner-b-false--Door-b-false--Window-b-false",
    //     UID: "d480b324-d6bd-4e05-820f-c807a7a5ed7e",
    // },
    // {
    //     DID: "72ca9db90d31439dbf540c48b07abdb6",
    //     DN: "Bedroom Lamp",
    //     DD: "pot-n-0-255--state-b--battery-n-0-100--brightness-n-0-100--hue-n-0-255",
    //     UID: "09c007bd-526b-4d8e-a9b9-96daff857759",
    // },
    // {
    //     DID: "89c44c3dbab948faa265ecd787743f15",
    //     DN: "Smart Door Lock",
    //     DD: "locked-b-false--battery-n-0-100-96",
    //     UID: "09c007bd-526b-4d8e-a9b9-96daff857759",
    // },
    // {
    //     DID: "93645a58-d45e-498e-80b1-aaf50e290924",
    //     DN: "Bed",
    //     DD: "light-b-0-0-0--led-b-0-0-0--",
    //     UID: "80ff2b60-bf4b-42fe-8de4-d21734a393c8",
    // },
    // {
    //     DID: "a550b29757374abda73c15d29e2cd1e1",
    //     DN: "Smart Thermostat",
    //     DD: "temperature-n-0-100-24.4--humidity-n-0-100-69.123--state-b-true--battery-n-0-100-24",
    //     UID: "d480b324-d6bd-4e05-820f-c807a7a5ed7e",
    // },
    // {
    //     DID: "b330e7fc-e85f-4057-b39c-953ce556c9dc",
    //     DN: "Desk",
    //     DD: "lampState-b-0-0-1--lampBrightness-n-0-100-63--monitor-b-0-0-1--",
    //     UID: "80ff2b60-bf4b-42fe-8de4-d21734a393c8",
    // },
    // {
    //     DID: "f33573d762614e47a0008659bb5de53e",
    //     DN: "Bedroom Switcher Hub",
    //     DD: "Power-b-true--Computer-b-true--Lamp-b-true--Fan-b-false--TV-b-false--Speaker-b-true",
    //     UID: "09c007bd-526b-4d8e-a9b9-96daff857759",
    // },
]

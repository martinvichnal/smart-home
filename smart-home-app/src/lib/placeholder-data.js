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
        did: "72ca9db90d31439dbf540c48b07abdb6", // did: device id
        dn: "Bedroom Lamp", // dn: device name
        dd: "pot-n-0-255--state-b--battery-n-0-100--brightness-n-0-100--hue-n-0-255",
    },
    {
        did: "f33573d762614e47a0008659bb5de53e",
        dn: "Bedroom Switcher Hub",
        dd: "Power-b-false--battery-n-0-100-50.2--Computer-b-true--Lamp-b-true--Fan-b-false--TV-b-false--Speaker-b-true--Air Conditioner-b-false--Door-b-false--Window-b-false",
    },
    {
        did: "a550b29757374abda73c15d29e2cd1e1",
        dn: "Smart Thermostat",
        dd: "temperature-n-0-100-24.4--humidity-n-0-100-69.123--state-b-true--battery-n-0-100-24",
    },
    {
        did: "89c44c3dbab948faa265ecd787743f15",
        dn: "Smart Door Lock",
        dd: "locked-b-false--battery-n-0-100-98",
    },
]

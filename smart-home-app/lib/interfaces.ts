export interface DeviceInterface {
    did: string
    dn: string
    dd: string
    uid: string
}

export interface DeviceVariableInterface {
    name: string
    type: string
    min: number
    max: number
    value: number
}

export interface RenderDeviceProps {
    did: string
    dn: string
    dd: string
    uid: string
    onDeviceChange: any
}

export interface RenderDeviceVariableProps {
    name: string
    type: string
    min: number
    max: number
    value: number | boolean | string
    onDeviceVariableChange: any
}

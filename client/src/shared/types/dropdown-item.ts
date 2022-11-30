import { To } from "react-router-dom"

export type DropdownItem = {
    label: string
    key?: string
    isLink?: boolean
    action?: To | any
}
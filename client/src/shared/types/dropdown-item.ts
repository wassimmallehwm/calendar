import { To } from "react-router-dom"

export type DropdownItem = {
    label: string
    isLink?: boolean
    action?: To | any
}
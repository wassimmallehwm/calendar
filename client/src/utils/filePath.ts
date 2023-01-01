import { Config } from "../config/Config"
import placeholder from '../assets/placeholder.png'
//import userDefault from '../assets/user_default.png'

export const userImage = (path: string) => {
    return path ? `${Config.getConfig().publicUrl}users/${path}` : placeholder
}

export const appImage = (path: string) => {
    return path ? `${Config.getConfig().publicUrl}images/${path}` : placeholder
}

export const publicFile = (path: string) => {
    return `${Config.getConfig().publicUrl}${path}`
}

export const homePageImage = () => {
    return `${Config.getConfig().publicUrl}homePage.webp`
}
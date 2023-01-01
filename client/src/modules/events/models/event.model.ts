import { Category, EmptyCategory } from '@modules/settings/models/Category';
import { Account } from "@modules/users/models/Account"
import { formatDateToInput, getHours, getMinutes } from "@utils/dateFormat"

export type Event = {
    id: string,
    title: string,
    description: string,
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    category: Category,
    textColor?: string,
    backgroundColor?: string,
    eventUrl?: string,
    isPrivate?: boolean,
    allowedViewers?: any[],
    appNotifs?: boolean,
    emailNotifs?: boolean,
    createdBy?: Account
}

export const initEvent: Event = {
    id: '',
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    category: EmptyCategory,
    eventUrl: '',
    isPrivate: false,
    appNotifs: true,
    emailNotifs: true,
    allowedViewers: []
}

export const formatCalendarToEvent = (data: any) => {
    const startDate = new Date(data.start)
    const endDate = new Date(data.end)
    let result: Event = {
        id: data.id,
        title: data.title,
        description: data.extendedProps.description,
        category: data.extendedProps.category,
        startDate: formatDateToInput(startDate),
        startTime: getHours(startDate) + ":" + getMinutes(startDate),
        endDate: formatDateToInput(endDate),
        endTime: getHours(endDate) + ":" + getMinutes(endDate),
        textColor: data.textColor,
        backgroundColor: data.backgroundColor,
        eventUrl: data.extendedProps.eventUrl,
        isPrivate: data.extendedProps.isPrivate,
        appNotifs: data.extendedProps.appNotifs,
        emailNotifs: data.extendedProps.emailNotifs,
        allowedViewers: data.extendedProps.allowedViewers,
        createdBy: data.extendedProps.createdBy
    }
    return result
}
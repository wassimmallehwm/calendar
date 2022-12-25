import { formatDateToInput, getHours, getMinutes } from "@utils/dateFormat"

export type Event = {
    id: string,
    title: string,
    description: string,
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    category: string,
    textColor?: string,
    backgroundColor?: string,
    eventUrl?: string,
    isPrivate?: boolean,
    allowedViewers?: any[]
}

export const initEvent: Event = {
    id: '',
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    category: '',
    eventUrl: '',
    isPrivate: false,
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
        allowedViewers: data.extendedProps.allowedViewers
    }
    return result
}
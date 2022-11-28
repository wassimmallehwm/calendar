import { formatDateToInput, getHours, getMinutes } from "@utils/dateFormat"

export type Event = {
    id: string,
    title: string,
    description: string,
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    textColor: string,
    backgroundColor: string,
    eventUrl?: string
}

export const initEvent = {
    id: '',
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    textColor: '#000000',
    backgroundColor: '#000000',
    eventUrl: ''
}

export const formatCalendarToEvent = (data: any) => {
    const startDate = new Date(data.start)
    const endDate = new Date(data.end)
    let result: Event = {
        id: data.id,
        title: data.title,
        description: data.extendedProps.description,
        startDate: formatDateToInput(startDate),
        startTime: getHours(startDate) + ":" + getMinutes(startDate),
        endDate: formatDateToInput(endDate),
        endTime: getHours(endDate) + ":" + getMinutes(endDate),
        textColor: data.textColor,
        backgroundColor: data.backgroundColor,
        eventUrl: data.extendedProps.eventUrl
    }
    return result
}
export interface Event {
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
import moment from "moment"

export const formateDate = (date: any) => {
    return moment(date).format("DD/MM/YYYY")
}

export const formateDateTime = (date: any) => {
    return moment(date).format("DD/MM/YYYY HH:mm")
}

export const fromNow = (date: any) => {
    return moment(date).fromNow()
}

export const formatDateToInput = (date: any) => {
    return moment(date).format('YYYY-MM-DD')
}

export const formatToReadableDate = (date: string, time: string) => {
    const _date = new Date(date)
    let f = 'DD MMMM, YYYY'
    if(time != '00:00'){
        f += ', h:mma'
    }
    return moment(_date).format(f)
}

export const getMinutes = (date: any) => {
    const minutes = moment(date).minutes()
    if(minutes == 0){
        return "00"
    } else if(minutes < 10){
        return `0${minutes}`
    }else {
        return minutes.toString()
    }
}

export const getHours = (date: any) => {
    const hours = moment(date).hours()
    if(hours == 0){
        return "00"
    } else if(hours < 10){
        return `0${hours}`
    }else {
        return hours.toString()
    }
}
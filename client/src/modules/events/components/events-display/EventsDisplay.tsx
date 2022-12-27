import { AuthContext } from '@contexts/index';
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Modal } from '../../../../shared/components';
import { Event } from '../../models/event.model';
import moment from 'moment';
import { formatToReadableDate } from '@utils/dateFormat';

interface EventsDisplayProps {
    event: Event
}

const EventsDisplay = ({
    event
}: EventsDisplayProps) => {

    const {
        id,
        title,
        description,
        startDate,
        startTime,
        endDate,
        endTime,
        category,
        eventUrl,
        createdBy
    } = event

    return (
        <div className='flex flex-col gap-4 px-2 py-4'>

            <div className='text-lg font-bold text-gray-600'>
                {formatToReadableDate(startDate, startTime)} - {formatToReadableDate(endDate, endTime)}
            </div>

            <div className=''>
                <div className='flex items-center gap-4'>
                    <span className='text-lg font-bold text-gray-600'>Category</span>
                    <div className='py-2 px-4 rounded-lg' style={{ backgroundColor: category.backgroundColor }}>
                        <span className='uppercase' style={{ color: category.textColor }}> {category.label} </span>
                    </div>
                </div>
            </div>

            {
                eventUrl && eventUrl !== "" ? (
                    <div className=''>
                        <div className='flex items-center gap-4'>
                            <span className='text-lg font-bold text-gray-600'>Event URL</span>
                            <a className='underline' target="_blank" href={eventUrl}>
                                {eventUrl}
                            </a>
                        </div>
                    </div>
                ) : null
            }

            <p className='text-justify'> {description} </p>

        </div>
    )
}

export default EventsDisplay

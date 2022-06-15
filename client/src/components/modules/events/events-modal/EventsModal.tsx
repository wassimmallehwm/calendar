import React, { useState } from 'react'
import { Modal } from '../../../../shared/components';
import { Input } from '../../../../shared/components/form';
import { showToast } from '../../../../utils/toast';
import { EventsService } from '../events.service';
import { Event, initEvent } from '../models/event.model';

const EventsModal = () => {

    const eventsService = new EventsService()
    const [event, setEvent] = useState<Event>(initEvent)
    const {
        title,
        description,
        startDate,
        startTime,
        endDate,
        endTime,
        textColor,
        backgroundColor,
        eventUrl
    } = event

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEvent({ ...event, [e.target.name]: e.target.value })
    }

    const onCreateEvent = async () => {
        try{
            const { data } = await eventsService.create(event);
            console.log(data)
            showToast('success', 'Event created successfully')
        }catch(e: any) {
            showToast('error', 'An error occured while creating an event')
        }
    }

    return (
        <Modal
            title='Create a new event'
            open={true}
            cancel={() => console.log("close")}
            footerBtns
            confirm={onCreateEvent}
        >
            <form className='flex flex-col gap-6'>
                <div>
                    <label>
                        Event title
                    </label>
                    <Input
                        placeholder="Event title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label>
                        Event description
                    </label>
                    <Input
                        placeholder="Event description"
                        name="description"
                        textarea="true"
                        value={description}
                        onChange={onChange}
                    />
                </div>

                <div className='flex items-center justify-between gap-4'>
                    <div className='w-full'>
                        <label>Start date</label>
                        <Input
                            placeholder="Start date"
                            type="date"
                            name="startDate"
                            value={startDate}
                            onChange={onChange}
                        />
                    </div>
                    <div className='w-full'>
                        <label>Start time</label>
                        <Input
                            //onChange={(e: any) => console.log(e.target.value)}
                            placeholder="Start time"
                            type="time"
                            name="startTime"
                            value={startTime}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className='flex items-center justify-between gap-4'>
                    <div className='w-full'>
                        <label>End date</label>
                        <Input
                            placeholder="End date"
                            type="date"
                            name="endDate"
                            value={endDate}
                            onChange={onChange}
                        />
                    </div>
                    <div className='w-full'>
                        <label>End time</label>
                        <Input
                            placeholder="End time"
                            type="time"
                            name="endTime"
                            value={endTime}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className='flex items-center justify-between gap-4'>
                    <div className='w-full'>
                        <label>Background color</label>
                        <Input
                            type="color"
                            name="backgroundColor"
                            value={backgroundColor}
                            onChange={onChange}
                        />
                    </div>
                    <div className='w-full'>
                        <label>Text color</label>
                        <Input
                            type="color"
                            name="textColor"
                            value={textColor}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div>
                    <label>Event url</label>
                    <Input
                        placeholder="Event url"
                        type="url"
                        name="eventUrl"
                        value={eventUrl}
                        onChange={onChange}
                    />
                </div>

            </form>
        </Modal>
    )
}

export default EventsModal

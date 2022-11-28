import { ChangeEvent } from 'react'
import { Modal } from '../../../../shared/components';
import { Input } from '../../../../shared/components/form';
import { Event } from '../../models/event.model';

interface EventsModalProps{
    open: boolean
    close: any
    save: any
    event: Event
    setEvent: any
}

const EventsModal = ({
    open,
    close,
    save,
    event,
    setEvent
}: EventsModalProps) => {

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

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEvent({ ...event, [e.target.name]: e.target.value })
    }

    const modalTitle = title && title !== "" ? title : "Create an event"

    return (
        <Modal
            title={modalTitle}
            open={open}
            cancel={close}
            footerBtns
            confirm={save}
        >
            <form className='flex flex-col gap-6'>
                <div>
                    <label>
                        Title
                    </label>
                    <Input
                        name="title"
                        type="text"
                        value={title}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label>
                        Description
                    </label>
                    <Input
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
                            type="date"
                            name="startDate"
                            value={startDate}
                            max={endDate}
                            onChange={onChange}
                        />
                    </div>
                    <div className='w-full'>
                        <label>Start time</label>
                        <Input
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
                            type="date"
                            name="endDate"
                            value={endDate}
                            min={startDate}
                            onChange={onChange}
                        />
                    </div>
                    <div className='w-full'>
                        <label>End time</label>
                        <Input
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

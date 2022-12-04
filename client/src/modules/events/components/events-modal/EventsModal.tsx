import { categoriesService } from '@modules/settings';
import { Category } from '@modules/settings/models';
import { ChangeEvent, useEffect, useState } from 'react'
import { Modal } from '../../../../shared/components';
import { AutoComplete, Input, Select } from '../../../../shared/components/form';
import { Event } from '../../models/event.model';

interface EventsModalProps {
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

    const [categories, setCategories] = useState<Category[]>([])

    const getCategories = () => {
        categoriesService.findAll()
            .then(res => setCategories(res))
            .catch(error => console.error(error))
    }

    useEffect(() => {
        getCategories()
    }, [])

    const {
        title,
        description,
        startDate,
        startTime,
        endDate,
        endTime,
        category,
        eventUrl
    } = event

    const onChange = (e: ChangeEvent<any>) => {
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
                        <label>Category</label>
                        <Select name='category' onChange={onChange} value={category!}>
                            {
                                categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>
                                        <div className='flex items-center gap-4'>
                                            <div className='h-8 w-8 rounded-full' style={{ backgroundColor: cat.backgroundColor }}>
                                                {/* <span className='uppercase' style={{ color: cat.textColor }}> {cat.label![0]} </span> */}
                                            </div>
                                            <span style={{ color: cat.textColor }}>{cat.label}</span>
                                        </div>
                                    </option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className='w-full'>
                        <label>Event url</label>
                        <Input
                            type="url"
                            name="eventUrl"
                            value={eventUrl}
                            onChange={onChange}
                        />
                    </div>
                </div>

            </form>
        </Modal>
    )
}

export default EventsModal

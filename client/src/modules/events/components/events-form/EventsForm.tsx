import { categoriesService } from '@modules/settings';
import { Category, Group } from '@modules/settings/models';
import groupsService from '@modules/settings/services/groups.service';
import { ChangeEvent, useEffect, useState } from 'react'
import { Checkbox, Input, Select, MultipleSelect } from '../../../../shared/components/form';
import { Event } from '../../models/event.model';

interface EventsFormProps {
    event: Event
    setEvent: any
}

const EventsForm = ({
    event,
    setEvent
}: EventsFormProps) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [groups, setGroups] = useState<Group[]>([])

    const getCategories = () => {
        categoriesService.findAll()
            .then(res => setCategories(res))
            .catch(error => console.error(error))
    }

    const getGroups = () => {
        groupsService.findAll()
            .then(res => setGroups(res))
            .catch(error => console.error(error))
    }

    useEffect(() => {
        getCategories()
        getGroups()
    }, [])

    const {
        title,
        description,
        startDate,
        startTime,
        endDate,
        endTime,
        category,
        eventUrl,
        isPrivate,
        allowedViewers,
    } = event

    const onChange = (e: ChangeEvent<any>) => {
        if (e.target.name == 'isPrivate') {
            setEvent((prev: Event) => ({ ...prev, [e.target.name]: !prev.isPrivate }))
        } else {
            setEvent({ ...event, [e.target.name]: e.target.value })
        }
    }

    const onChangeViewers = (newValue: any[]) => {
        setEvent({ ...event, allowedViewers: newValue })
    }

    return (
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
                    <Select name='category' onChange={onChange} value={category._id!}>
                        {
                            categories.map(cat => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.label}
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

            <div className='flex items-center justify-between gap-4'>
                <div className='w-full'>
                    <Checkbox checked={isPrivate!} label="Private" name="isPrivate" onChange={onChange} />
                </div>

                {
                    isPrivate ? (
                        <div className='w-full'>
                            <label>Groups</label>
                            <MultipleSelect
                                isLoading={false}
                                id="multiselect-groups"
                                placeholder="Groups"
                                options={groups.map(elem => {
                                    elem.value = elem._id
                                    return elem
                                })}
                                labelKey={(option: any) => `${option.label}`}
                                renderMenuItemChildren={(option: any) => <span>{option.label}</span>}
                                onChange={onChangeViewers}
                                selected={allowedViewers}
                            />
                        </div>
                    ) : null
                }
            </div>

        </form>
    )
}

export default EventsForm

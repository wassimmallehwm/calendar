import { categoriesService } from '@modules/settings';
import { Category, Group } from '@modules/settings/models';
import groupsService from '@modules/settings/services/groups.service';
import { ChangeEvent, useEffect, useState } from 'react'
import { Input, Select, MultipleSelect, Toggle } from '@shared/components/form';
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
        appNotifs,
        emailNotifs,
        allowedViewers,
    } = event

    const onChange = (e: ChangeEvent<any>) => {
        setEvent({ ...event, [e.target.name]: e.target.value })
    }

    const onChangeBool = (value: boolean, field: string) => {
        setEvent({ ...event, [field]: value })
    }

    const onChangeViewers = (newValue: any[]) => {
        setEvent({ ...event, allowedViewers: newValue })
    }

    const [enabled, setEnabled] = useState(false)

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
                    <Toggle enabled={isPrivate!} label="Private"
                        onChange={(val: boolean) => onChangeBool(val, "isPrivate")} />
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

            <div>
                <span className='mb-2 block font-medium text-gray-700'> 
                    Notify participants by:
                </span>
                <div className='flex items-center justify-between gap-4'>

                    <div className='w-full'>
                        <Toggle enabled={appNotifs!} label="App notification"
                            onChange={(val: boolean) => onChangeBool(val, "appNotifs")} />
                    </div>

                    <div className='w-full'>
                        <Toggle enabled={emailNotifs!} label="Email"
                            onChange={(val: boolean) => onChangeBool(val, "emailNotifs")} />
                    </div>

                </div>
            </div>

        </form>
    )
}

export default EventsForm

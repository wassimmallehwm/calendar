import React from 'react'
import { Modal } from '../../../../shared/components';
import { Input } from '../../../../shared/components/form';

const EventsModal = () => {
    return (
        <Modal
            title='Create a new event'
            open={true}
            cancel={() => console.log("close")}
            footerBtns
            confirm={() => console.log("save")}
        >
            <form className='flex flex-col gap-6'>
                <div>
                    <label>
                        Event label
                    </label>
                    <Input
                        label="Event name"
                        placeholder="Event name"
                        name="event_name"
                        type="text"
                        value="new event"
                        onChange={() => { }}
                    />
                </div>
                <div>
                    <label>
                        Event description
                    </label>
                    <Input
                        placeholder="Event name"
                        name="event_name"
                        textarea="true"
                        value="new event"
                        onChange={() => { }}
                    />
                </div>

                <div className='flex items-center justify-between gap-4'>
                    <div className='w-full'>
                        <label>Start date</label>
                        <Input
                            placeholder="Start date"
                            type="date"
                        />
                    </div>
                    <div className='w-full'>
                        <label>Start time</label>
                        <Input
                            onChange={(e: any) => console.log(e.target.value)}
                            placeholder="Start time"
                            type="time"
                        />
                    </div>
                </div>

                <div className='flex items-center justify-between gap-4'>
                    <div className='w-full'>
                        <label>End date</label>
                        <Input
                            placeholder="End date"
                            type="date"
                        />
                    </div>
                    <div className='w-full'>
                        <label>End time</label>
                        <Input
                            placeholder="End time"
                            type="time"
                        />
                    </div>
                </div>
                <div className='flex items-center justify-between gap-4'>
                    <div className='w-full'>
                        <label>Background color</label>
                        <Input
                            type="color"
                        />
                    </div>
                    <div className='w-full'>
                        <label>Text color</label>
                        <Input
                            type="color"
                        />
                    </div>
                </div>

                <div>
                    <label>Url</label>
                    <Input
                        type="url"
                    />
                </div>

            </form>
        </Modal>
    )
}

export default EventsModal

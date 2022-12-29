import { AuthContext } from '@contexts/index';
import { categoriesService } from '@modules/settings';
import { Category, Group } from '@modules/settings/models';
import groupsService from '@modules/settings/services/groups.service';
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Modal } from '../../../../shared/components';
import { Checkbox, Input, Select, MultipleSelect } from '../../../../shared/components/form';
import { Event } from '../../models/event.model';
import EventsDisplay from '../events-display/EventsDisplay';
import EventsForm from '../events-form/EventsForm';

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

    const { user } = useContext(AuthContext)

    const {
        id,
        title,
        createdBy
    } = event

    const modalTitle = id && id !== "" ? title : "Create an event"

    const isEventCreator = () => (user?._id == createdBy?._id && id != undefined) || !id

    return (
        <Modal
            title={modalTitle}
            open={open}
            cancel={close}
            footerBtns={isEventCreator()}
            confirm={save}
        >
            {
                isEventCreator() ? (
                    <EventsForm event={event} setEvent={setEvent}/>
                ) : (
                    <EventsDisplay event={event}/>
                )
            }

        </Modal>
    )
}

export default EventsModal

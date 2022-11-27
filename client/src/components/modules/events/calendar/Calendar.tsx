import { useEffect, useRef, useState } from 'react';
import FullCalendar, { DatesSetArg, ViewMountArg } from '@fullcalendar/react';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import './calendar.css';
import EventsModal from '../events-modal/EventsModal';
import { EventsService } from '../events.service';
import { Event, formatCalendarToEvent, initEvent } from '../models/event.model';
import { showToast } from '../../../../utils/toast';
import { formatDateToInput } from '../../../../utils/dateFormat';


function createDateAsUTC(date: any) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function convertDateToUTC(date: any) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}

type ActiveDate = {
  activeStart: Date | null
  activeEnd: Date | null
}

const Calendar = () => {
  const eventsService = new EventsService()
  const calendarRef = useRef<any>()
  const [events, setEvents] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event>(initEvent)
  const [eventModal, setEventModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [activeDate, setActiveDate] = useState<ActiveDate>({
    activeStart: null,
    activeEnd: null
  })
  const { activeStart, activeEnd } = activeDate

  const onSaveEvent = async () => {
    try {
      setLoading(true)
      await eventsService.createOrUpdate(event);
      getEventsByRange()
      closeEventModal()
      showToast('success', 'Event saved successfully')
    } catch (e: any) {
      showToast('error', 'An error occured while saving an event')
    } finally {
      setLoading(false)
    }
  }

  const openAddEventModal = () => {
    setEventModal(true)
  }

  const openEditEventModal = () => {
    setEventModal(true)
  }

  const closeEventModal = () => {
    setEventModal(false)
    setEvent(initEvent)

  }

  const getEventsByRange = () => {
    setLoading(true)
    eventsService.findByRange(activeStart!, activeEnd!)
      .then(res => setEvents(res.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }

  const updateActiveDate = () => {
    const { activeStart, activeEnd } = calendarRef.current?._calendarApi?.view
    setActiveDate({
      activeStart,
      activeEnd
    })
  }

  useEffect(() => {
    updateActiveDate()
  }, [])

  useEffect(() => {
    if (activeDate.activeStart && activeDate.activeEnd) {
      getEventsByRange()
    }
  }, [activeDate])


  const options: CalendarOptions = {
    loading: (isLoading: boolean) => setLoading(isLoading),
    height: '75vh',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    //defaultView: 'dayGridMonth',
    //defaultDate: value,
    // headerToolbar: {
    //   left: 'dayGridMonth timeGridWeek timeGridDay',
    //   center: 'title',
    //   right: 'prevYear prev next nextYear'
    // },
    headerToolbar: {
      left: '',
      center: '',
      right: ''
    },
    weekNumberCalculation: 'ISO',
    locales: [frLocale],
    locale: 'fr',
    editable: true,
    eventBorderColor: "#00000000",
    displayEventTime: false,
    eventDisplay: "",
    //navLinks: true,
    dateClick: (info: any) => {
      //console.log('clicked on ' + createDateAsUTC(info.date).toString());
      setEvent({
        ...event,
        endDate: formatDateToInput(info.date),
        startDate: formatDateToInput(info.date)
      })
      openEditEventModal()
    },
    eventClick: (info: any) => {
      setEvent(formatCalendarToEvent(info.event))
      openEditEventModal()
    },
    eventMouseEnter: (info: any) => {
      //console.log("ID : ", info.event);
    },
    eventMouseLeave: (info: any) => {
      //console.log("ID : ", info.event.id);
    },
    eventDrop: (info: any) => {
      //console.log("ID : ", info.event.id);
    },
    eventResize: (info: any) => {
      //console.log("ID : ", info.event.id);
    },
    // viewDidMount: (mountArg: ViewMountArg) => {
    //   if(!activeDate.activeStart && !activeDate.activeEnd){
    //     updateActiveDate(mountArg.view.activeStart, mountArg.view.activeEnd)
    //   }
    // }
    datesSet: (arg: DatesSetArg) => {
      setTitle(arg.view.title)
    }
  };

  const changeViewType = (view: string) => {
    calendarRef.current._calendarApi.changeView(view);
    updateActiveDate()
  }

  const next = () => {
    calendarRef.current._calendarApi.next();
    updateActiveDate()
  }
  const prev = () => {
    calendarRef.current._calendarApi.prev();
    updateActiveDate()
  }

  const nextYear = () => {
    calendarRef.current._calendarApi.nextYear();
    updateActiveDate()
  }
  const prevYear = () => {
    calendarRef.current._calendarApi.prevYear();
    updateActiveDate()
  }
  const today = () => {
    calendarRef.current._calendarApi.today();
    updateActiveDate()
  }

  return (
    <div id="main-container" style={{ padding: '1rem' }}>

      <div className='flex justify-between'>
        <div className='flex items-center gap-2'>
          <button onClick={openAddEventModal}>New event</button>
          <button onClick={() => today()}>Today</button>
        </div>
        <h2 className='flex items-center gap-2'>
          <button className='border-2 p-1 rounded-sm'
            onClick={() => prevYear()}> {'<<'}
          </button>
          <button className='border-2 p-1 rounded-sm'
            onClick={() => prev()}> {'<'}
          </button>
          <span className='capitalize font-bold'>{title}</span>
          <button className='border-2 p-1 rounded-sm'
            onClick={() => next()}> {'>'}
          </button>
          <button className='border-2 p-1 rounded-sm'
            onClick={() => nextYear()}> {'>>'}
          </button>
        </h2>
        <div className='flex items-center gap-2'>
          <button onClick={() => changeViewType('dayGridMonth')}>Month</button>
          <button onClick={() => changeViewType('timeGridWeek')}>Week</button>
          <button onClick={() => changeViewType('timeGridDay')}>Day</button>
        </div>
      </div>

      <EventsModal open={eventModal} close={closeEventModal} event={event} setEvent={setEvent} save={onSaveEvent} />
      {/* <button onClick={changeView}>CHANGE</button>
      <button onClick={prev}>prev</button>
      <button onClick={next}>NEXT</button>
      <button onClick={today}>today</button> */}
      <FullCalendar ref={calendarRef} events={events} {...options} />
      {/* <EventsModal/> */}
    </div>
  );
}

export default Calendar;

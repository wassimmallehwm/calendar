import { useEffect, useRef, useState } from 'react';
import FullCalendar, { DatesSetArg, ViewMountArg } from '@fullcalendar/react';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import './calendar.css';
import EventsModal from '../events-modal/EventsModal';
import { EventsService } from '../../services/events.service';
import { Event, formatCalendarToEvent, initEvent } from '../../models/event.model';
import { showToast } from '@utils/toast';
import { formatDateToInput } from '@utils/dateFormat';
import { Button, Dropdown } from '@shared/components';
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { FaEllipsisV, FaPlus, FaRegCalendarAlt } from 'react-icons/fa';
import { DropdownItem } from '@shared/types';


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
  const [currentView, setCurrentView] = useState<string>('dayGridMonth');
  const [activeDate, setActiveDate] = useState<ActiveDate>({
    activeStart: null,
    activeEnd: null
  })
  const { activeStart, activeEnd } = activeDate

  const onSaveEvent = async () => {
    try {
      setLoading(true)
      if(event.allowedViewers && event.allowedViewers.length > 0){
        event.allowedViewers.map(elem => elem._id)
      }
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
    viewClassNames: 'my-calendar',
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
    fixedWeekCount: false,
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
    // viewDidMount: (arg: ViewMountArg) => {
    //   setTitle(arg.view.title)
    // }
  };

  const changeViewType = (view: string) => {
    calendarRef.current._calendarApi.changeView(view);
    setCurrentView(view)
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

  const views: DropdownItem[] = [
    { action: () => changeViewType('dayGridMonth'), key: 'dayGridMonth', label: 'month' },
    { action: () => changeViewType('timeGridWeek'), key: 'timeGridWeek', label: 'week' },
    { action: () => changeViewType('timeGridDay'), key: 'timeGridDay', label: 'day' }
  ]

  return (
    <div id="main-container" style={{ padding: '1rem' }}>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button small margin={false} color='primary'
            onClick={openAddEventModal} title={'New event'}>
            <span className='block md:hidden'>
              <FaPlus size="14" />
            </span>
            <span className='hidden md:block'>
              New event
            </span>
          </Button>
          <Button small margin={false} color='primary' outline
            onClick={() => today()} title={'Today'}>

            <span className='block md:hidden'>
              <FaRegCalendarAlt size="14" />
            </span>
            <span className='hidden md:block'>
              Today
            </span>
          </Button>
        </div>

        <h2 className='flex items-center gap-2'>
          <div className='hidden md:block'>
            <Button small margin={false} color='primary' outline
              onClick={() => prevYear()}>
              <BsChevronDoubleLeft size="16" />
            </Button>
          </div>
          <Button small margin={false} color='primary' outline
            onClick={() => prev()}>
            <BsChevronLeft size="16" />
          </Button>

          <span className='capitalize font-bold'>{title}</span>

          <Button small margin={false} color='primary' outline
            onClick={() => next()}>
            <BsChevronRight size="16" />
          </Button>
          <div className='hidden md:block'>
            <Button small margin={false} color='primary' outline
              onClick={() => nextYear()}>
              <BsChevronDoubleRight size="16" />
            </Button>
          </div>

        </h2>

        <div className='hidden md:flex items-center gap-2'>
          {
            views.map(({ key, action, label }: any) => (
              <Button key={key} margin={false} color='primary'
                outline={key !== currentView} small
                onClick={action}>
                {label}
              </Button>
            ))
          }
        </div>
        <div className='block md:hidden'>
          <Dropdown trigger={
            <Button asDiv margin={false} color='primary' outline rounded>
              <FaEllipsisV size="14" />
            </Button>
          } items={views} />
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

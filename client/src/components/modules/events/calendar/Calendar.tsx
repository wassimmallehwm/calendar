import { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
//import './calendar.css';
import EventsModal from '../events-modal/EventsModal';
import { EventsService } from '../events.service';


function createDateAsUTC(date: any) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function convertDateToUTC(date: any) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}

const Calendar = () => {
  const eventsService = new EventsService()
  const calendarRef = useRef<any>()
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([{
    id: '1',
    title: 'First event',
    start: new Date().toISOString().slice(0, 10)+ "T12:00:00",
    end: new Date().toISOString().slice(0, 10)+ "T14:00:00",
    textColor: '#000000',
    backgroundColor: 'rgba(130, 200, 230, 0.5)'
  }, {
    id: '2',
    title: 'Second event',
    start: '2021-12-01',
    end: '2021-12-06',
    //url: 'https://wassimmalleh.com'
    textColor: '#000000',
    backgroundColor: 'rgba(130, 200, 230, 0.5)'
  }]);

  /**
   * {
    id: '1',
    title: 'First event',
    start: new Date().toISOString().slice(0, 10)+ "T12:00:00",
    end: new Date().toISOString().slice(0, 10)+ "T14:00:00",
    textColor: '#000000',
    backgroundColor: 'rgba(130, 200, 230, 0.5)'
  }, {
    id: '2',
    title: 'Second event',
    start: '2021-12-01',
    end: '2021-12-06',
    //url: 'https://wassimmalleh.com'
    textColor: '#000000',
    backgroundColor: 'rgba(130, 200, 230, 0.5)'
  }
   */

  const getEvents = () => {
    eventsService.findAll().then(
      res => {
        console.log(res.data)
        setEvents(res.data)
      }
    )
  }

  useEffect(() => {
    getEvents()
  }, [])
  const options: CalendarOptions = {
    height: '80vh',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    //defaultView: 'dayGridMonth',
    //defaultDate: value,
    headerToolbar: {
      left: 'dayGridMonth timeGridWeek timeGridDay',
      center: 'title',
      right: 'prevYear prev next nextYear'
    },
    // headerToolbar: {
    //   left: '',
    //   center: '',
    //   right: ''
    // },
    weekNumberCalculation: 'ISO',
    locales: [frLocale],
    locale: 'fr',
    editable: true,
    //navLinks: true,
    dateClick: (info: any) => {
      console.log('clicked on ' + createDateAsUTC(info.date).toString());
    },
    eventClick: (info: any) => {
      //console.log("ID : ", info.event.id);
      //console.log("TITLE : ", info.event.title);
      console.log("START DATE : ", info.event.start);
      console.log("END DATE : ", info.event.end);
      console.log("END DATE AS UTC: ", createDateAsUTC(info.event.end).toString());
      console.log("END DATE TO UTC: ", convertDateToUTC(info.event.end).toString());
    },
    eventMouseEnter: (info: any) => {
      //console.log("ID : ", info.event);
      //console.log("TITLE : ", info.event.title);
      //console.log("START DATE : ", info.event.start);
      //console.log("END DATE : ", info.event.end);
    },
    eventMouseLeave: (info: any) => {
      //console.log("ID : ", info.event.id);
      //console.log("TITLE : ", info.event.title);
      //console.log("START DATE : ", info.event.start);
      //console.log("END DATE : ", info.event.end);
    },
    eventDrop: (info: any) => {
      //console.log("ID : ", info.event.id);
      //console.log("TITLE : ", info.event.title);
      //console.log("START DATE : ", info.event.start);
      //console.log("END DATE : ", info.event.end);
    },
    eventResize: (info: any) => {
      //console.log("ID : ", info.event.id);
      //console.log("TITLE : ", info.event.title);
      //console.log("START DATE : ", info.event.start);
      //console.log("END DATE : ", info.event.end);
    }
  };

  const changeView = () => {
    calendarRef.current._calendarApi.changeView('timeGridWeek');
  }

  const next = () => {
    calendarRef.current._calendarApi.next();
  }

  const prev = () => {
    calendarRef.current._calendarApi.prev();
  }
  const today = () => {
    calendarRef.current._calendarApi.today();
  }

  return (
    <div id="main-container" style={{ padding: '1rem' }}>
    <button onClick={next}>NEXT</button>
      {/* <EventsModal/> */}
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

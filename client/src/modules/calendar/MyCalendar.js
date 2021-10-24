import {useRef, useState} from 'react';
import { FullCalendar, FullCalendarProps } from 'primereact/fullcalendar';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './calendar.css';


function createDateAsUTC(date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function convertDateToUTC(date) { 
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
}

function MyCalendar() {
  const calendarRef = useRef()
  const [value, onChange] = useState(new Date());
  const [events, setEvents]= useState([{
    id: '1',
    title: 'First event',
    start: '2021-10-01',
    end: '2021-10-04'
  },{
    id: '2',
    title: 'Second event',
    start: '2021-10-01',
    end: '2021-10-06',
    //url: 'https://wassimmalleh.com'
    textColor: '#000000',
    backgroundColor: 'rgba(130, 200, 230, 0.5)'
  }]);
    const options = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultView: 'dayGridMonth',
        defaultDate: value,
        headerToolbar: {
            left: 'prevYear prev',
            center: 'title',
            right: 'next nextYear'
        },
        weekNumberCalculation: 'ISO',
        locales: [ frLocale ],
        locale: 'fr',
        editable: true,
        //navLinks: true,
        dateClick: (info) => {
          console.log('clicked on ' + createDateAsUTC(info.date).toString());
        },
        eventClick: (info) => {
          //console.log("ID : ", info.event.id);
          //console.log("TITLE : ", info.event.title);
          console.log("START DATE : ", info.event.start);
          console.log("END DATE : ", info.event.end);
          console.log("END DATE AS UTC: ", createDateAsUTC(info.event.end).toString());
          console.log("END DATE TO UTC: ", convertDateToUTC(info.event.end).toString());
        },
        eventMouseEnter: (info) => {
          //console.log("ID : ", info.event.id);
          //console.log("TITLE : ", info.event.title);
          //console.log("START DATE : ", info.event.start);
          //console.log("END DATE : ", info.event.end);
        },
        eventMouseLeave: (info) => {
          //console.log("ID : ", info.event.id);
          //console.log("TITLE : ", info.event.title);
          //console.log("START DATE : ", info.event.start);
          //console.log("END DATE : ", info.event.end);
        },
        eventDrop: (info) => {
          //console.log("ID : ", info.event.id);
          //console.log("TITLE : ", info.event.title);
          //console.log("START DATE : ", info.event.start);
          //console.log("END DATE : ", info.event.end);
        },
        eventResize: (info) => {
          //console.log("ID : ", info.event.id);
          //console.log("TITLE : ", info.event.title);
          //console.log("START DATE : ", info.event.start);
          //console.log("END DATE : ", info.event.end);
        }
    };

  return (
    <div id="main-container" style={{padding: '2rem'}}>
      <FullCalendar ref={calendarRef} events={events} options={options} />
    </div>
  );
}

export default MyCalendar;

import React, { useState } from 'react';
import Calendar from '@lls/react-light-calendar';
import '@lls/react-light-calendar/dist/index.css'; 


const CalendarComp = () => {
  const date = new Date();
  const [startDate, setstartDate] = useState (date.getTime());
  const [endDate, setendDate] = useState (new Date(startDate).setDate(date.getDate()))

  return (
    <Calendar startDate={startDate} endDate={endDate} /*onChange={(startDate, endDate)=>(setstartDate(startDate), setendDate(endDate))}*/ range displayTime />
  )
}

export default CalendarComp;
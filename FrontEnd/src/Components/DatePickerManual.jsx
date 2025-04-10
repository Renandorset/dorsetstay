import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({setPrice1,charges}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dayDifference, setDayDifference] = useState(null);
  const [error, setError] = useState(null);

  const today = new Date();

  const handleStartDateChange = (date) => {
    if (date && date < today) {
      setError("Start date cannot be in the past");
      setStartDate(null);
    } else {
      setError(null);
      setStartDate(date);
      if (endDate && endDate < date) {
        setEndDate(null);
        setDayDifference(null);
      } else {
        calculateDayDifference(date, endDate);
      }
    }
  };

  const handleEndDateChange = (date) => {
    if (date && date < startDate) {
      setError("End date cannot be before the start date");
      setEndDate(null);
    } else if (date && date < today) {
      setError("End date cannot be in the past");
      setEndDate(null);
    } else {
      setError(null);
      setEndDate(date);
      calculateDayDifference(startDate, date);
    }
  };

  const calculateDayDifference = (start, end) => {
    if (start && end) {
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      setDayDifference(differenceInDays);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Store the date range in a single variable
  const dateRange = startDate && endDate ? `${formatDate(startDate)} to ${formatDate(endDate)}` : '';
  useEffect(()=>{
    setPrice1(charges*dayDifference)
  },[  
    dayDifference
  ])


  return (
    <div>
      <h3>Select a start date and end date</h3>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        placeholderText="Start Date"
        dateFormat="dd/MM/yyyy"
        minDate={today}
      />
      <span> to </span>
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        placeholderText="End Date"
        dateFormat="dd/MM/yyyy"
        minDate={startDate ? startDate : today}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {startDate && endDate && (
        <div>
          <p>Start Date: {formatDate(startDate)}</p>
          <p>End Date: {formatDate(endDate)}</p>
          <p>Number of days between: {dayDifference} day(s)</p>
          <p>Date Range: {dateRange.toString()}</p> 
          {/* Use the single variable here */}
        </div>
      )}

      
    </div>
  );
};

export default DateRangePicker;
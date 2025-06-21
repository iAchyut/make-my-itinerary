import React from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const DatePickerComponent = ({ label, name, date, setDate }) => {


  return (
    <DatePicker
      name={name}
      label={label}
      value={date}
      onChange={(newValue) => setDate(newValue)}
      renderInput={(params) => <TextField {...params} fullWidth />}
    />
  );
};

export default DatePickerComponent;

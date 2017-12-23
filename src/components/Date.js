import React from 'react';
import DatePicker from 'react-native-datepicker';

export const Date = ({ date, onDateChange, style }) => {
    return (
        <DatePicker 
        style={style}
        date={date}
        mode="datetime"
        androidMode='spinner'
        format="MM/DD/YYYY"
        minDate="01/01/1998"
        maxDate='12/31/2025'
        showIcon={false}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={onDateChange}
        />
    );
};

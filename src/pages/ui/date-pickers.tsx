import { useState } from 'react';

import { HolidayCalendar } from '@/components/ui/holiday-calendar';
import MonthPickerPopover from '@/components/ui/month-picker-popup';
import SingleDatePicker from '@/components/ui/single-date-picker';
import { Title } from '@/components/ui/title';
import YearPickerPopover from '@/components/ui/year-picker-popup';

const DatePickers = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='space-y-1.5'>
        <Title variant={'h6'}>Single Date Picker</Title>
        <SingleDatePicker
          showAssistant
          disableIcon
          className='justify-center'
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
      </div>
      <div className='space-y-1.5'>
        <Title variant={'h6'}>Month Picker</Title>
        <MonthPickerPopover
          showAssistant
          disableIcon
          className='justify-center'
          date={selectedDate}
          setDate={setSelectedDate}
          maxDate={new Date()}
        />
      </div>
      <div className='space-y-1.5'>
        <Title variant={'h6'}>year Picker</Title>
        <YearPickerPopover
          showAssistant
          disableIcon
          className='justify-center'
          date={selectedDate}
          setDate={setSelectedDate}
          maxDate={new Date()}
        />
      </div>
      <div className='space-y-1.5'>
        <Title variant={'h6'}>Holiday Calendar</Title>
        <HolidayCalendar
          selected={new Date()}
          highlightedDates={
            [{ date: '2026-01-01', name: 'New Year' }].map((e) => ({
              date: new Date(e.date),
              info: e.name,
            })) ?? []
          }
          className=''
        />
      </div>
    </div>
  );
};

export default DatePickers;

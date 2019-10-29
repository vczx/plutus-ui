import * as React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

import { dateFormat, monthFormat } from '../../store/utils/momentFormat';

interface RecordDatePickerProps {
  onDateSelected: (date: moment.Moment | null, dateString: string) => void;
  value?: moment.Moment;
  disabledDate?: (date: moment.Moment | undefined) => boolean;
}

export const RecordDatePicker: React.FC<RecordDatePickerProps> = (props) => (
  <DatePicker
    showToday={false}
    defaultValue={moment()}
    value={props.value}
    format={dateFormat}
    onChange={props.onDateSelected}
    placeholder='default is today'
    disabledDate={props.disabledDate || ((current: moment.Moment | undefined) => false)}
  />
);

export const RecordMonthPicker: React.FC<RecordDatePickerProps> = (props) => (
  <DatePicker.MonthPicker
    format={monthFormat}
    onChange={props.onDateSelected}
    placeholder='Select month'
  />
);

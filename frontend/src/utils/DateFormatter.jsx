import React from 'react';
import Moment from 'react-moment';
import relative from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

const DateFormatter = ({ date }) => {
  dayjs.extend(relative);
  return (
    <span>
      <Moment format="D / MM / YYYY" withTitle>
      {date}
    </Moment>
   <p>{ dayjs().from(dayjs(date))}</p>
    </span>
  );
};

export default DateFormatter;

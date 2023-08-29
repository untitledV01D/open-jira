import { formatDistance } from 'date-fns';

export const getFormatDistance = (date: Date) => {
  const fromNow = formatDistance( new Date(date), new Date() );

  return fromNow;
};
import { parseISO } from 'date-fns';

export const converEventsToDateEvents = (vents = []) => {
  return vents.map((event) => ({
    ...event,
    start: parseISO(event.start),
    end: parseISO(event.end),
  }));
};

import { useDispatch, useSelector } from 'react-redux';
import {
  onSetActivedEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
} from './../store/calendar/calendarSlice';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActivedEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    //TODO: Llega al event
    if (calendarEvent._id) {
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startEventDelete = () => {
    dispatch(onDeleteEvent());
  };

  return {
    //* Properties
    events,
    activeEvent,
    hastEventSelected: !!activeEvent,
    //* methods
    setActiveEvent,
    startSavingEvent,
    startEventDelete,
  };
};

import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActivedEvent,
  onUpdateEvent,
} from './../store/calendar/calendarSlice';
import calendarApi from '../api/calendarApi';
import { converEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActivedEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //Uodate event
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      //Create a new event
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
    } catch (error) {
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
  };

  const startEventDelete = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = converEventsToDateEvents(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.error('Error car gando eventos', { error });
    }
  };

  return {
    //* Properties
    events,
    activeEvent,
    hastEventSelected: !!activeEvent,
    //* methods
    setActiveEvent,
    startEventDelete,
    startLoadingEvents,
    startSavingEvent,
  };
};

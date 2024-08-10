import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';

export const FabAddNew = () => {
  const { isDateModalOpen, openDateModal, closeDateModal } = useUiStore();
  const { events, activeEvent, setActiveEvent } = useCalendarStore();

  const handleClicNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 1),
      bgColor: '#fafafa',
      user: {
        _id: 1,
        name: 'User demo',
      },
    });
    openDateModal();
  };
  return (
    <button className='btn btn-primary fab' onClick={handleClicNew}>
      <i className='fas fa-plus'></i>
    </button>
  );
};

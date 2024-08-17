import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDelete = () => {
  const { isDateModalOpen } = useUiStore();
  const { startEventDelete, hastEventSelected } = useCalendarStore();

  const handleClicDelete = () => {
    startEventDelete();
  };
  return (
    <button
      className='btn btn-danger fab-danger'
      onClick={handleClicDelete}
      style={{
        display: hastEventSelected && !isDateModalOpen ? 'block' : 'none',
      }}
    >
      <i className='fas fa-trash-alt'></i>
    </button>
  );
};

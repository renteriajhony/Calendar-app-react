import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUiStore } from '../../hooks/';

export const calendarModalHook = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent, setActiveEvent } = useCalendarStore();
  const [formSummited, setformSummited] = useState(false);
  const [formValues, setformValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 1),
  });

  const titleClass = useMemo(() => {
    if (!formSummited) return '';
    return formValues.title.length <= 0 ? 'is-invalid' : '';
  }, [formValues.title, formSummited]);

  useEffect(() => {
    if (activeEvent !== null) setformValues({ ...activeEvent });
  }, [activeEvent]);

  const onInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (date, changing) => {
    setformValues({
      ...formValues,
      [changing]: date,
    });
  };

  const onCloseModal = () => {
    setActiveEvent(null);
    closeDateModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setformSummited(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Fechas incorrectas',
        text: 'Revisar las fechas ingresadas',
      });
      return;
    }
    if (formValues.title.length <= 0) return;
    await startSavingEvent(formValues);
    setformSummited(false);
    onCloseModal();
    //!TODO: cerrar modal
  };
  return {
    formValues,
    titleClass,
    onInputChange,
    onDateChange,
    onCloseModal,
    onSubmit,
    isDateModalOpen,
  };
};

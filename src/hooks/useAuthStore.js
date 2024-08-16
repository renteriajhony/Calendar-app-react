import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from './../api';
import {
  onCheckingCredentials,
  onLogin,
  onLogouth,
  clearerrorMessage,
} from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onCheckingCredentials());

    try {
      const { data } = await calendarApi.post('/auth', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch ({ response }) {
      dispatch(onLogouth('Credenciales incorrectas'));
      setTimeout(() => {
        dispatch(clearerrorMessage());
      }, 10);
    }
  };

  return {
    /* Properties */
    status,
    user,
    errorMessage,
    /* Methods */
    startLogin,
  };
};
1;

import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from './../api';
import {
  onCheckingCredentials,
  onLogin,
  onLogouth,
  clearerrorMessage,
  onLogoutCalendar,
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

  const startRegister = async ({ name, email, password }) => {
    dispatch(onCheckingCredentials());

    try {
      const { data } = await calendarApi.post('/auth/new', {
        name,
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch ({ response }) {
      dispatch(onLogouth(response.data.msg || ''));
      setTimeout(() => {
        dispatch(clearerrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return dispatch(onLogouth());
    }

    try {
      const { data } = await calendarApi.get('/auth/renew');
      localStorage.setItem('token', data.token);
      const now = new Date().getTime();
      localStorage.setItem('token-init-date', now);
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      return dispatch(onLogouth());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogouth());
  };

  return {
    /* Properties */
    status,
    user,
    errorMessage,
    /* Methods */
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
1;

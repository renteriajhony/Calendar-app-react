import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { CalendarPage } from '../calendar/';
import { authStatusType } from '../auth/';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === authStatusType.cheking) {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {status === authStatusType.notAuthenticated ? (
        <>
          <Route exact path='/auth/*' element={<LoginPage />} />
          <Route exact path='/*' element={<Navigate to='/auth/login' />} />
        </>
      ) : (
        <>
          <Route exact path='/' element={<CalendarPage />} />
          <Route exact path='/*' element={<Navigate to='/' />} />
        </>
      )}
    </Routes>
  );
};

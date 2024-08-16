import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { CalendarPage } from '../calendar/';
import { authStatusType } from '../auth/';

export const AppRouter = () => {
  const authStatus = authStatusType.notAuthenticated;
  return (
    <Routes>
      {authStatus === authStatusType.notAuthenticated ? (
        <Route exact path='/auth/*' element={<LoginPage />} />
      ) : (
        <Route exact path='/*' element={<CalendarPage />} />
      )}

      <Route exact path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
};

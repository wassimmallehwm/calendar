import React, { Suspense, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Login from './components/modules/auth/Login';

import Calendar from './components/modules/calendar/Calendar';
import { AppContext } from './contexts';
import { Loader } from './shared/components';
import { GuestRoute, ProtectedRoute } from './shared/guards';
import { Toaster } from 'react-hot-toast';


function App() {

  return (

    <BrowserRouter>
      <AppContext>
        <Layout>
          <Toaster/>
          <Routes>
            <Route path="/" element={
              <Suspense fallback={(<Loader />)}>
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              </Suspense>
            } />
            <Route path="/login" element={
              <Suspense fallback={(<Loader />)}>
                <GuestRoute>
                  <Login />
                </GuestRoute>
              </Suspense>
            } />
          </Routes>
        </Layout>
      </AppContext>
    </BrowserRouter>
  );
}

export default App;

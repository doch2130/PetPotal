// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import Search from './components/Search/Search';
import MemberJoin from './pages/MemberJoin';
import LoginPage from './pages/LoginPage';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <MainPage />},
      {path: '/memberjoin', element: <MemberJoin />},
      {path: '/search/:keyword', element: <Search />},
      {path: '/login', element: <LoginPage />},
    ]
  }
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen = {false} />
  </QueryClientProvider>
);

import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';

import './index.css';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import Search from './components/Search/Search';
import MemberJoin from './pages/MemberJoin';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import MatePage from './pages/MatePage';
import MateWritePage from './pages/MateWritePage';
import MateDetailPage from './pages/MateDetailPage';
import PrivatePage from './pages/PrivatePage';
import RestrictedPage from './pages/RestrictedPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <MainPage />},
      {path: '/memberjoin', element: <RestrictedPage><MemberJoin /></RestrictedPage>},
      {path: '/search/:keyword', element: <Search />},
      {path: '/login', element: <RestrictedPage><LoginPage /></RestrictedPage>},
      {path: '/mypage/:page', element: <PrivatePage><MyPage /></PrivatePage>},
      {path: '/mate', element: <MatePage />},
      {path: '/mate/write', element: <PrivatePage><MateWritePage /></PrivatePage>},
      {path: '/mate/detail/1', element: <MateDetailPage />},
    ]
  }
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </RecoilRoot>

);

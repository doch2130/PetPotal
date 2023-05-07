/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { UserType, userState } from './recoil/user';
import Controller from './api/controller';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoadingPage from './pages/LoadingPage';
import Modal from './components/UI/Modal';
import Alert from './components/UI/Alert';
import Confirm from './components/UI/Confirm';
import ErrorPage from './pages/ErrorPage';

function App() {
  const controller = new Controller();
  const [userInfo, setUserInfo] = useRecoilState<UserType[]>(userState);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [authError, setAuthError] = useState<Boolean>(false);

  useEffect(() => {
    const auth = async () => {
      setIsLoading(true);
      try {
        const result = await controller.auth();
        // console.log('result : ', result);
        setUserInfo([result.data]);
      } catch (err) {
        setAuthError(true);
      } finally {
        setIsLoading(false);
      }
    }
    
    auth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   console.log("userInfo : ", userInfo);
  // }, [userInfo]);
  
  return (
    <div className="App">
      {isLoading ?
      <LoadingPage /> :
      authError ? <ErrorPage /> :
      <>
        <Navbar />
        <Outlet />
        <Footer />
        <Modal />
        <Alert />
        <Confirm />
      </>
      }
    </div>
  );
}

export default App;

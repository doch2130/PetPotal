/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { UserTypes, userState } from './recoil/user';
import Controller from './api/controller';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoadingPage from './pages/LoadingPage';

function App() {
  const [userInfo, setUserInfo] = useRecoilState<UserTypes[]>(userState);
  const controller = new Controller();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    const auth = async () => {
      setIsLoading(false);
      const result = await controller.auth();
      setUserInfo([result.data]);
      setIsLoading(true);

      // setTimeout(() => {
      //   setIsLoading(true);
      // }, 100);
    }

    auth();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="App">
      {/* <Navbar />
      <Outlet />
      <Footer /> */}
      {!isLoading ?
      <LoadingPage /> :
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
      }
    </div>
  );
}

export default App;

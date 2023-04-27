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
      // const result = await controller.auth();
      // const result = await axios.post('http://localhost:3010/api/auth');
      // if(result.data.responseCode !== 200) {
      //   alert('페이지 에러가 발생하였습니다. 새로고침 후 다시 이용해주세요.');
      //   return ;
      // }
      // setUserInfo([result.data]);
      setTimeout(() => {
        // console.log('loading');
        setIsLoading(true);
      }, 5000);
    }

    auth();

  }, []);
  
  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <Footer />
      {/* {!isLoading ?
      <LoadingPage /> :
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
      } */}
    </div>
  );
}

export default App;

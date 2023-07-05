import { useEffect } from "react";
import MainBeauty from "../components/MainSection/beauty/MainBeauty";
import MainFood from "../components/MainSection/food/MainFood";
import MainHome from "../components/MainSection/home/MainHome";
import MainHospital from "../components/MainSection/hospital/MainHospital";
import MainHotel from "../components/MainSection/hotel/MainHotel";
import MainHoteling from "../components/MainSection/hoteling/MainHoteling";
import MainMate from "../components/MainSection/mate/MainMate";


export default function MainPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <MainHome />
      <MainMate />
      <MainHospital />
      <MainBeauty />
      <MainHoteling />
      <MainHotel />
      <MainFood />
    </>
    
  )
}


import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Register from "./pages/Register.jsx"; 
import SignIn from "./pages/SignIn.jsx";
import MyHotels from "./pages/MyHotels.jsx";
import {useContext} from "react";
import { AppContext } from "./contexts/AppContext.jsx";
import AddHotel from "./pages/AddHotel.jsx";
import EditHotel from "./pages/EditHotel.jsx";
import Search from "./pages/Search.jsx";
import Detail from "./pages/Detail.jsx";
import Booking from "./pages/Booking.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  const {isLoggedIn} = useContext(AppContext);
  
  return ( <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="sign-in" element={<SignIn />} />
        
        <Route path="add-hotel" element={
          isLoggedIn === null ? <div className="flex justify-center items-center h-screen">Loading...</div> :
          isLoggedIn ? <AddHotel /> : <Navigate to="/sign-in" />
        } />
        <Route path="my-hotels" element={<MyHotels/>}/>
        <Route path="my-bookings" element={<MyBookings/>}/>
        <Route path="edit-hotel/:id" element={<EditHotel/>}/>
        <Route path="search" element={<Search/>}/>
        <Route path="detail/:hotelId" element={<Detail/>}/>
        <Route path="hotel/:hotelId/booking" element={<Booking/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  </>
  )
}



import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Register from "./pages/Register.jsx"; 
import SignIn from "./pages/SignIn.jsx";
export default function App() {
  return ( <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<h1>Home Page</h1>} />
        <Route path="register" element={<Register />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  </>
  )
}


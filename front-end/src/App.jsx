import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Navber from "./Navber.jsx";
import Footer from "./Footer.jsx";
import Home from "./Home.jsx";
// import { LoginProvider } from "./contexts/LoginContext.jsx";
import AuthProvider from "./contexts/authContext.jsx";

function App() {
  // const [userLogedIn, setUserLogedIn] = useState(false);

  return (
    <AuthProvider>
      {/* <LoginProvider value={{ userLogedIn, setUserLogedIn }}> */}
        <BrowserRouter>
          <Navber />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      {/* </LoginProvider> */}
    </AuthProvider>
  );
}

export default App;

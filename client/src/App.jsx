import React from "react";
import Container from "@mui/material/Container";
//import LandingPage from './components/LandingPage';
import LandingPage from "./make_my_itinerary_landing.jsx";
import { AuthProvider } from "./Auth/AuthContext.jsx";
import { NotificationContextProvider } from "./NotificationContext/index.jsx";

function App() {
  return (
    <NotificationContextProvider>
      <AuthProvider>
        <LandingPage />
      </AuthProvider>
    </NotificationContextProvider>
  );
}

export default App;

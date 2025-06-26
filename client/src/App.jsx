import React from "react";
import Container from "@mui/material/Container";
//import LandingPage from './components/LandingPage';
import LandingPage from "./make_my_itinerary_landing.jsx";
import { AuthProvider } from "./Auth/AuthContext.jsx";
function App() {
  return (
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  );
}

export default App;

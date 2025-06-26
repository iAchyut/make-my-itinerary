import React, { useState } from "react";
import { Layout, Menu, Button, AutoComplete, DatePicker, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./App.css";
import AutoCompleteComponent from "./components/AutoComplete";
import { GetPlaceAutofill } from "./apiCalls/api";
import LoginModal from "./firebase/LoginModal.jsx";
import { useAuth, handleLogout } from "./Auth/AuthContext.jsx"; // Adjust the import path as necessary
import image from "./assets/unsplash.jpg"; // Placeholder image path

const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;

const App = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const user = useAuth();
  console.log("User from AuthContext:", user);
  const placeSelectedHandler = (value) => {
    console.log("Selected Place:", value, user);
  };

  return (
    <Layout>
      {/* Navbar */}
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(90deg,rgba(255, 179, 179, 1) 0%, rgba(181, 181, 255, 1) 0%, rgba(0, 212, 255, 1) 100%)",
          padding: "0 30px",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "24px", color: "#000" }}>
          MakeMyItinerary
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Menu
            mode="horizontal"
            style={{ borderBottom: "none", background: "transparent" }}
          >
            <Menu.Item key="destinations">Destinations</Menu.Item>
            <Menu.Item key="booking">Booking</Menu.Item>
          </Menu>
          {user && user.user ? (
            <>
              <p>Hello, {user.user.displayName}</p>
              <Button type="text" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <div>
              <Button type="text" onClick={() => setLoginOpen(true)}>
                Login / SignUp
              </Button>
            </div>
          )}

          <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
        </div>
      </Header>

      {/* Hero Section */}
      <Content style={{ padding: "60px 100px", backgroundColor:"#fff" }}>
        <Row gutter={48} align="middle">
          <Col span={12}>
            <h1
              style={{
                fontSize: "42px",
                fontWeight: "bold",
                color: "#1f1f1f",
                marginBottom: 40,
              }}
            >
              Enter your destination and dates
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                alignItems: "center",
              }}
            >
              <AutoCompleteComponent
                handleSearch={GetPlaceAutofill}
                onSelect={placeSelectedHandler}
              />
              <RangePicker style={{ height: 50, width: "100%" }} size="large" />
              <Button type="primary" style={{ width: "40%" }}>
                Get My Iternerary
              </Button>
            </div>
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            {/* Travel-themed image suggestion placeholder */}
            <img
              src={image}
              alt="Travel inspiration"
              style={{
                width: "100%",
                borderRadius: "20px",
                maxHeight: 400,
                objectFit: "cover",
              }}
            />
          </Col>
        </Row>
      </Content>

      {/* Footer */}
      <Footer
        style={{
          background: "#fff",
          padding: "60px 100px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 200 }}>
          <h2 style={{ color: "#000" }}>MakeMyItinerary</h2>
          <p>Book your trip in minutes, get full control for much longer.</p>
        </div>
        <div style={{ flex: 1, minWidth: 150 }}>
          <h4>Company</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>About</li>
            <li>Careers</li>
            <li>Mobile</li>
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: 150 }}>
          <h4>Contact</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>Help/FAQ</li>
            <li>Press</li>
            <li>Affiliates</li>
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: 150 }}>
          <h4>More</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>Airlinefees</li>
            <li>Airline</li>
            <li>Low fare tips</li>
          </ul>
        </div>
      </Footer>
    </Layout>
  );
};

export default App;

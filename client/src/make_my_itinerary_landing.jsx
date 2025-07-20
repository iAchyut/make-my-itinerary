import React, { useState, useRef } from "react";
import { Layout, Menu, Button, AutoComplete, DatePicker, Row, Col} from "antd";
import { SyncOutlined } from "@ant-design/icons";
import "./App.css";
import AutoCompleteComponent from "./components/AutoComplete";
import { GetPlaceAutofill } from "./apiCalls/api";
import LoginModal from "./firebase/LoginModal.jsx";
import { useAuth, handleLogout } from "./Auth/AuthContext.jsx"; // Adjust the import path as necessary
import image from "./assets/unsplash.jpg"; // Placeholder image path
import { Formik } from "formik";
import useAPI from "./apiCalls/useAPI";
import ItineraryModal from "./components/ItineraryModal";
import SavedItinerariesModal from "./components/SavedItinerary/index.jsx"; // Adjust the import path as necessary
import NotificationContext from "./NotificationContext/index.jsx"; // Adjust the import path as necessary

const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;

const App = () => {
   const formRef = useRef();
  const [loginOpen, setLoginOpen] = useState(false);
  const user = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const { openNotificationWithIcon } = React.useContext(NotificationContext);
  console.log("openNotificationWithIcon", openNotificationWithIcon);

  let { data, loadingData, error, fetchData } = useAPI(
    `${import.meta.env.VITE_API_ENDPOINT}api/itinerary/search`
  );
  console.log("Fetched itinerary data:", data, loadingData, error);

  let { data: savedItineraryData, fetchData: fetchSavedItineraries } = useAPI(
    `${import.meta.env.VITE_API_ENDPOINT}api/itinerary/get-user-itineraries`
  );

  const placeSelectedHandler = (value) => {
    console.log("Selected Place:", value, user);
  };
  const [modalVisible, setModalVisible] = useState(false);

  const fetchItineraries = async () => {
    try {
      fetchSavedItineraries(
        {
          method: "GET",
        },
        (response) => {
          console.log("Response data:", response);
          setModalVisible(true);
           formRef.current.resetForm(); 
        }
      );
    } catch (error) {
      openNotificationWithIcon('error', 'Error', `Error getting Inineraries: Contact support if the issue persists.`);
      console.error("Error in form submission:", error);
      return;
    }
  };

  const handleRowClick = (record) => {
    setSelectedItinerary(record.itineraryData);
    setIsModalOpen(true);
  };


  return (
    <Layout>
      {/* Navbar */}
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background:
            "linear-gradient(90deg,rgba(255, 179, 179, 1) 0%, rgba(181, 181, 255, 1) 0%, rgba(0, 212, 255, 1) 100%)",
          padding: "0 30px",
        }}
      >
        <div style={{ fontWeight: "400", fontSize: "24px", color: "#000" }}>
          MakeMyItinerary
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {user && user.user ? (
            <>
              <Menu
                mode="horizontal"
                style={{ borderBottom: "none", background: "transparent" }}
              >
                <Menu.Item key="destinations" onClick={fetchItineraries}>
                  Saved Itinerary
                </Menu.Item>
              </Menu>
            </>
          ) : (
            <></>
          )}

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
      <Content style={{ padding: "60px 100px", backgroundColor: "#fff" }}>
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
            <Formik
              initialValues={{ place: "", dateRange: [] }}
              validate={(values) => {
                const errors = {};
                if (!values.place) {
                  errors.place = "Destination is required";
                }
                if (values.dateRange.length < 2 || !values.dateRange[0] || !values.dateRange[1] ) {
                  errors.dateRange = "Dates are required";
                }

                console.log("Formik values check:", values, errors);
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                try {
                  setSubmitting(true);
                  console.log("Form values:", values);
                  fetchData(
                    {
                      method: "POST",
                      data: {
                        place: values.place,
                        dateRange: values.dateRange,
                      },
                    },
                    (response) => {
                      console.log("Response data:", response);
                      setSelectedItinerary(JSON.parse(response.response));
                      setIsModalOpen(true);
                      setSubmitting(false);
                    }
                  );
                } catch (error) {
                  console.error("Error in form submission:", error);
                  setSubmitting(false);
                  return;
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                setFieldTouched,
                innerRef,
              }) => {
                formRef.current = innerRef;
                console.log("Formik innerRef:", innerRef);
                console.log("Formik values:", values, errors, touched);
                return (
                  <form onSubmit={handleSubmit}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,
                        alignItems: "center",
                      }}
                    >
                      <AutoCompleteComponent
                        value={values.place}
                        onChange={(value) => setFieldValue("place", value)}
                        onBlur={() => setFieldTouched("place", true)}
                        handleSelect={(value) => setFieldValue("place", value)}
                        error={errors.place && touched.place ? errors.place : ""}
                        placeholder="Where to?"
                        size="large"
                        handleSearch={GetPlaceAutofill}
                        onSelect={placeSelectedHandler}
                        disabled={isSubmitting}
                      />
                      <div  style={{ width: "100%", display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-start" }}>
                      <RangePicker
                        name="dateRange"
                        value={values.dateRange}
                        disabled={isSubmitting}
                        onBlur={() => setFieldTouched("dateRange", true)}
                        onChange={(value) => {
                          setFieldValue("dateRange", value);
                        }}
                        style={{ height: 50, width: "100%" }}
                        size="large"
                        status={errors.dateRange  && touched.dateRange ? "error" : ""}
                        placeholder={["Start Date", "End Date"]}
                      />
                       {errors && touched.dateRange && errors.dateRange && (<label style={{color:"red"}}>{errors.dateRange}</label>)}
                      </div>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={
                          isSubmitting && { icon: <SyncOutlined spin /> }
                        }
                        style={{ width: "40%" }}
                      >
                        Get My Iternerary
                      </Button>
                    </div>
                  </form>
                );
              }}
            </Formik>
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
      <ItineraryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itineraryData={selectedItinerary ? selectedItinerary : null}
      />
      <SavedItinerariesModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        itineraries={savedItineraryData ? savedItineraryData : []}
        onSelectItinerary={handleRowClick}
      />

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

import {useContext} from "react";
import { Modal, Descriptions, List, Typography, Divider, Row, Col, Spin  } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import useAPI from "../../apiCalls/useAPI"; // Adjust the import path as necessary
import {useAuth} from "../../Auth/AuthContext"; // Adjust the import path as necessary
import NotificationContext from "../../NotificationContext"; // Adjust the import path as necessary

const { Title } = Typography;
  

const ItineraryModal = ({ open, onClose, itineraryData }) => {
  const context = useAuth();
  const { openNotificationWithIcon } = useContext(NotificationContext);

  let { data, loading:loadingData, error, fetchData } = useAPI(
    `${import.meta.env.VITE_API_ENDPOINT}api/itinerary/save-user-itinerary`
  );

  const saveItinerary = (itineraryData) => {
    // Function to save the itinerary

    try {
      fetchData(
        {
          method: "POST",
          data: {
            itineraryData: itineraryData
          },
        },
        (response) => {
           openNotificationWithIcon('success', 'Saved Itinerary', `See your saved itineraries in Saved Itinerary section.`);
          console.log("Saved itineraryData:", response);
        }
      );
    } catch (error) {
      openNotificationWithIcon('error', 'Error', `Error saving Inineraries: Contact support if the issue persists.`);
      console.error("Error saving itinerary:", error);
      return;
    }
  };

  console.log("Itinerary Modal itineraryData:", itineraryData, open, onClose);

  if (!itineraryData) return null;
  console.log("Itinerary itineraryData:", itineraryData);
  const renderList = (title, items = []) => (
    <>
      <Divider orientation="left">{title}</Divider>
      <List
        size="small"
        bordered
        dataSource={Array.isArray(items[0]) ? items.flat() : items}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  );

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={"90%"}
      height={"90%"}
      zIndex={1100} // Ensure modal is on top
      centered
      title={
        <Title level={3}>
          <>
            {itineraryData.place}
            {"        "}
            {loadingData ? (
              <Spin size="small" style={{ marginLeft: 8 }} />
            ) : (
              <SaveOutlined
              size="large"
              onClick={() => saveItinerary(itineraryData)}
            />
            )}
            
          </>
        </Title>
      }
    >
      {}
      <Descriptions bordered column={2} size="middle">
        <Descriptions.Item label="From">
          {new Date(itineraryData.from).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Descriptions.Item>
        <Descriptions.Item label="To">
          {new Date(itineraryData.to).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Best Time to Visit">
          {itineraryData.bestTimeToVisit?.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Local Currency">
          {itineraryData.localCurrency?.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Weather">
          {itineraryData.localWeather?.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Local Languages">
          {itineraryData.localLanguage?.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Culture">
          {itineraryData.localCulture?.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Customs">
          {itineraryData.localCustoms?.join(", ")}
        </Descriptions.Item>
      </Descriptions>

      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={12}>
          {renderList(
            "Nearby Places to Visit",
            itineraryData.nearByplaceToVisit
          )}
          {renderList("Shopping Places", itineraryData.shoppingPlaces)}
          {renderList("Local Food", itineraryData.localFood)}
          {renderList("Local Transport", itineraryData.localTransport)}
          {renderList(
            "Best Route From Your Location",
            itineraryData.bestRouteFromYourLocation
          )}
        </Col>
        <Col span={12}>
          {renderList("Local Attractions", itineraryData.localAttractions)}
          {renderList("Local Events", itineraryData.localEvents)}
          {renderList("Local Art", itineraryData.localArt)}
          {renderList("Local Music", itineraryData.localMusic)}
          {renderList("Accommodation", itineraryData.localAccommodation)}
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={12}>
          {renderList("Documents Required", itineraryData.documentsReq)}
          {renderList("Health Tips", itineraryData.localHealthTips)}
          {renderList("Emergency Numbers", itineraryData.localEmergencyNumbers)}
        </Col>
        <Col span={12}>
          {renderList("Safety Tips", itineraryData.localSafety)}
          {renderList("Local History", itineraryData.localHistory)}
          {renderList("Shopping Items", itineraryData.localShopping)}
        </Col>
      </Row>
    </Modal>
  );
};

export default ItineraryModal;

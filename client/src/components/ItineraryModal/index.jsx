import React from "react";
import { Modal, Descriptions, List, Typography, Divider, Row, Col } from "antd";

const { Title } = Typography;

const ItineraryModal = ({ open, onClose, data }) => {
  if (!data) return null;
  console.log("Itinerary Data:", data);
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
      centered
      title={<Title level={3}>{data.place}</Title>}
    >
      <Descriptions bordered column={2} size="middle">
        <Descriptions.Item label="From">
          {new Date(data.from).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Descriptions.Item>
        <Descriptions.Item label="To">
          {new Date(data.to).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Best Time to Visit">
          {data.bestTimeToVisit?.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Local Currency">
          {data.localCurrency?.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Weather">
          {data.localWeather?.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Local Languages">
          {data.localLanguage?.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Culture">
          {data.localCulture?.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Customs">
          {data.localCustoms?.join(", ")}
        </Descriptions.Item>
      </Descriptions>

      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={12}>
          {renderList("Nearby Places to Visit", data.nearByplaceToVisit)}
          {renderList("Shopping Places", data.shoppingPlaces)}
          {renderList("Local Food", data.localFood)}
          {renderList("Local Transport", data.localTransport)}
          {renderList(
            "Best Route From Your Location",
            data.bestRouteFromYourLocation
          )}
        </Col>
        <Col span={12}>
          {renderList("Local Attractions", data.localAttractions)}
          {renderList("Local Events", data.localEvents)}
          {renderList("Local Art", data.localArt)}
          {renderList("Local Music", data.localMusic)}
          {renderList("Accommodation", data.localAccommodation)}
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={12}>
          {renderList("Documents Required", data.documentsReq)}
          {renderList("Health Tips", data.localHealthTips)}
          {renderList("Emergency Numbers", data.localEmergencyNumbers)}
        </Col>
        <Col span={12}>
          {renderList("Safety Tips", data.localSafety)}
          {renderList("Local History", data.localHistory)}
          {renderList("Shopping Items", data.localShopping)}
        </Col>
      </Row>
    </Modal>
  );
};

export default ItineraryModal;

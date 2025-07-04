import React from 'react';
import { Modal, Table, Tag } from 'antd';
import dayjs from 'dayjs';

const SavedItinerariesModal = ({ visible, onClose, itineraries, onSelectItinerary }) => {
  const columns = [
    {
      title: 'Place Name',
      dataIndex: ['itineraryData', 'place'],
      key: 'place',
      render: (place) => <b>{place}</b>,
    },
    {
      title: 'Trip Dates',
      key: 'tripDates',
      render: (_, record) => {
        const from = record.itineraryData?.from;
        const to = record.itineraryData?.to;
        return (
          <span>
            <Tag color="blue">{dayjs(from).format('DD MMM YYYY')}</Tag> to <Tag color="green">{dayjs(to).format('DD MMM YYYY')}</Tag>
          </span>
        );
      },
    },
    {
      title: 'Saved On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => dayjs(date).format('DD MMM YYYY'),
    },
  ];

  return (
    <Modal
      title="Saved Itineraries"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width="80%"
      zIndex={1000} // Ensure modal is on top
    >
      <Table
        dataSource={itineraries? itineraries.itineraries:[]}
        columns={columns}
        rowKey="_id"
        pagination={false}
        onRow={(record) => ({
          onClick: () => onSelectItinerary(record), // click handler
        })}
        rowClassName="clickable-row"
      />
    </Modal>
  );
};

export default SavedItinerariesModal;

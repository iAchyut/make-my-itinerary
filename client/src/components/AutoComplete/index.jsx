import React, { useState } from "react";
import { AutoComplete, Spin } from "antd";
import useAPI from "../../apiCalls/useAPI";
import ItineraryModal from "../ItineraryModal";

function AsyncAutoComplete() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let { data, loadingData, error, fetchData } = useAPI(
    `http://localhost:5000/api/itinerary/search`
  );
  console.log("Fetched itinerary data:", data, loadingData, error);

  const handleSearch = async (value) => {
    if (!value) {
      setOptions([]);
      return;
    }
    setLoading(true);
    // Simulate async fetch (replace with actual API call)
    // const { data } = await GetPlaceAutofill(value);
    //console.log("Fetched data:", data);]

    const data = await fetchSuggestions(value);

    setOptions(data.map((item) => ({ value: item.name })));
    setLoading(false);
  };

  const fetchSuggestions = async (query) => {
    // Simulated network delay
    await new Promise((r) => setTimeout(r, 500));
    return [
      {
        id: "place.25495659",
        name: "Lucknow, Uttar Pradesh, India",
        coordinates: [80.92392, 26.84312],
      },
      {
        id: "place.194349292",
        name: "Luck, Wisconsin, United States",
        coordinates: [-92.482422, 45.575746],
      },
      {
        id: "place.108070951",
        name: "Lucknow, Ontario, Canada",
        coordinates: [-81.51684, 43.9616],
      },
      {
        id: "place.194357484",
        name: "Luckey, Ohio, United States",
        coordinates: [-83.486052, 41.451458],
      },
      {
        id: "place.47761466",
        name: "Luckau, Kreis Dahme-Spreewald, Brandenburg, Germany",
        coordinates: [13.714768, 51.85282],
      },
    ];
  };

  const handleSelect = (value) => {
    console.log("Selected:", value);
    fetchData(
      {
        method: "POST",
        data: {
          place: value,
          to: "12/05/2025",
          from: "18/05/2025",
        },
      },
      (response) => {
        console.log("Response data:", response);
        setIsModalOpen(true);
      }
    );
  };

  return (
    <>
      <AutoComplete
        style={{ width: "100%" }}
        onSearch={handleSearch}
        notFoundContent={loading ? <Spin size="small" /> : "No Results"}
        onSelect={handleSelect}
        options={options}
        placeholder="Where to?"
        size="large"
      />
      <ItineraryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={data ? JSON.parse(data.response) : null}
      />
    </>
  );
}

export default AsyncAutoComplete;

import React, { useState } from "react";
import { AutoComplete, Spin } from "antd";
import { GetPlaceAutofill } from "../../apiCalls/api";

function AsyncAutoComplete() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <AutoComplete
      style={{ width: "100%" }}
      onSearch={handleSearch}
      notFoundContent={loading ? <Spin size="small" /> : "No Results"}
      options={options}
      placeholder="Where to?"
      size="large"
    />
  );
}

export default AsyncAutoComplete;

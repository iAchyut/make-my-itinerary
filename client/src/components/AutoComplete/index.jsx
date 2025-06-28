import React, { useState , useDeferredValue} from "react";
import { AutoComplete, Spin } from "antd";
import useAPI from "../../apiCalls/useAPI";
import ItineraryModal from "../ItineraryModal";
import {GetPlaceAutofill} from "../../apiCalls/api.js";

function AsyncAutoComplete({value, onChange, handleSelect}) {

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
 

  const deferredValue = useDeferredValue(value);


  const handleSearch = async (value) => {
    if (!value) {
      setOptions([]);
      return;
    }
    setLoading(true);
    // Simulate async fetch (replace with actual API call)
    const { data } = await GetPlaceAutofill(value);
    console.log("Fetched data:", data);

    setOptions(data.map((item) => ({ value: item.name })));
    setLoading(false);
  };



  return (
    <>
      <AutoComplete
        style={{ width: "100%" }}
        value={value}
        onChange={(text) => onChange(text)}
        onSearch={() => handleSearch(deferredValue)}
        notFoundContent={loading ? <Spin size="small" /> : "No Results"}
        onSelect={handleSelect}
        options={options}
        placeholder="Where to?"
        size="large"
      />
  
    </>
  );
}

export default AsyncAutoComplete;

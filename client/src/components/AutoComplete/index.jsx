import React, { useState , useDeferredValue} from "react";
import { AutoComplete, Spin } from "antd";
import {GetPlaceAutofill} from "../../apiCalls/api.js";
import { useContext } from "react";
import NotificationContext from "../../NotificationContext";
 



function AsyncAutoComplete({value, onChange, handleSelect, disabled, error, ...rest}) {

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  let {openNotificationWithIcon} = useContext(NotificationContext);

  const deferredValue = useDeferredValue(value);


  const handleSearch = async (value) => {
    if (!value) {
      setOptions([]);
      return;
    }
    setLoading(true);
    // Simulate async fetch (replace with actual API call)
    const { data } = await GetPlaceAutofill(value, openNotificationWithIcon);
    console.log("Fetched data:", data);

    setOptions(data.map((item) => ({ value: item.name })));
    setLoading(false);
  };



  return (
    <div  style={{ width: "100%", display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-start" }}>
      <AutoComplete
        style={{ width: "100%" }}
        value={deferredValue}
        onChange={(text) => onChange(text)}
        onSearch={() => handleSearch(deferredValue)}
        notFoundContent={loading ? <Spin size="small" /> : "No Results"}
        onSelect={handleSelect}
        options={options}
        placeholder="Where to?"
        size="large"
        disabled={disabled}
        status ={error ? "error" : ""}
        {...rest}
      />
    {error && (<label style={{color:"red"}}>{error}</label>)}
    </div>
  );
}

export default AsyncAutoComplete;

import axios from "axios";

export const GetPlaceAutofill = async (text) => {
  try {
    let data = await axios.get(`http://localhost:5000/api/itinerary/placeAutofill?text=${text}`);

    if (data.status === 200) {
      return data;
    } else {
      throw new Error("Failed to fetch place autofill data");
    }
  } catch (error) {
    console.error("Error fetching place autofill data:", error);
    throw new Error("Failed to fetch place autofill data");
  }
};

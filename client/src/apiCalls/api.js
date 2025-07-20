import axios from "axios";

export const GetPlaceAutofill = async (text, openNotificationWithIcon) => {
  try {
    let data = await axios.get(
      `${
        import.meta.env.VITE_API_ENDPOINT
      }api/itinerary/placeAutofill?text=${text}`
    );

    if (data.status === 200) {
      return data;
    } else {
      throw new Error("Failed to fetch place autofill data");
    }
  } catch (error) {
    openNotificationWithIcon(
      "error",
      "Error",
      `Error saving Inineraries: Contact support if the issue persists.`
    );
    console.error("Error fetching place autofill data:", error);
    throw new Error("Failed to fetch place autofill data");
  }
};

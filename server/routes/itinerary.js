import { OPENAI_API_KEY, MAPBOX_TOKEN } from "../config.js";
import express from "express";
import { OpenAI } from "openai";
import axios from "axios";
import { AutofillData } from "./data.js";
import User from "../models/user.js";

console.log("🔍 API KEY inside route:", OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const router = express.Router();

router.post("/search", async (req, res) => {
  try {
    const { place, dateRange } = req.body;

    console.log("🔍 itinerary search request from body:", place, dateRange, typeof dateRange);

    let fromDate = (dateRange[0]).toString() || new Date();
    let toDate = (dateRange[1]).toString() || new Date();

    console.log("🔍 itinerary search request:", place, fromDate, toDate);

    if (!place || !fromDate || !toDate) {
      return res
        .status(400)
        .json({ error: "Valid place and date range are required" });
    }

    let prompt = `Generate a travel itinerary JSON for:
Place: ${place}, From: ${fromDate}, To: ${toDate}.
Output strictly in this format:
{
  "place": "${place}",
  "from": "${fromDate}",
  "to": "${toDate}",
  "nearByplaceToVisit": [poplar places to visit near ${place}],
  "documentsReq": [ local, internaltional documents required to visit ${place}],
  "bestTimeToVisit": [best time to visit ${place}],
  "bestRouteFromYourLocation": ["Delhi", "Stop1", "Stop2",..... "${place}"]
  "shoppingPlaces": ["popular shopping places in ${place}"],
  "localFood": ["popular local food in ${place}"],
  "localTransport": ["popular local transport in ${place}"],
  "localLanguage": ["popular local language in ${place}"],
  "localCulture": ["popular local culture in ${place}"],
  "localCustoms": ["popular local customs in ${place}"],
  "localFestivals": ["popular local festivals in ${place}"],
  "localWeather": ["popular local weather in ${place}"],
  "localCurrency": ["popular local currency in ${place}"],
  "localSafety": ["popular local safety tips in ${place}"],
  "localEmergencyNumbers": ["popular local emergency numbers in ${place}"],
  "localHealthTips": ["popular local health tips in ${place}"],
  "localAttractions": ["popular local attractions in ${place}"],
  "localEvents": ["popular local events in ${place}"],
  "localHistory": ["popular local history in ${place}"],
  "localArt": ["popular local art in ${place}"],
  "localMusic": ["popular local music in ${place}"], 
  "localAccommodation": ["popular local accommodation in ${place}"],
  "localTransportation": ["popular local transportation in ${place}"],
  "localShopping": ["popular local shopping in ${place}"],
}`;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("Error in /search route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/placeAutofill", async (req, res) => {
  try {
    const { text } = req.query;
    console.log("🔍 placeAutofill", text);
    if (!text) {
      return res
        .status(400)
        .json({ error: "Text query parameter is required" });
    }

    let data = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          access_token: MAPBOX_TOKEN,
          autocomplete: true,
          types: "place",
          limit: 5, // Limit the number of results
        },
      }
    );

    if (data.status === 200) {
      const places = data.data.features.map((feature) => ({
        id: feature.id,
        name: feature.place_name,
        coordinates: feature.geometry.coordinates,
      }));

      res.json(places);
    } else {
      res.status(data.status).json({ error: "Failed to fetch place data" });
    }
  } catch (error) {
    console.error("Error in /placeAutofill route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Save user endpoint
router.post("/save-user", async (req, res) => {
  const { uid, name, email, photo } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ error: "uid and email required" });
  }

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({ uid, name, email, photo });
      console.log("✅ New user saved:", email);
    } else {
      console.log("ℹ️ User already exists:", email);
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("❌ Error saving user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

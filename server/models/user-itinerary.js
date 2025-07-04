import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const UserItinerarySchema = new mongoose.Schema({
  itineraryId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  userId: {
    type: String, // Firebase UID
    required: true,
  },
  itineraryData: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("UserItinerary", UserItinerarySchema);

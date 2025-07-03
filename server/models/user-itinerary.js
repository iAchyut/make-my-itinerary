import mongoose from "mongoose";

const UserItinerarySchema = new mongoose.Schema({
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

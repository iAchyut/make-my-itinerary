import { OPENAI_API_KEY } from './config.js';
import express from 'express';
import cors from 'cors';
import itineraryRouter from "./routes/itinerary.js"

const app = express();
// Middleware
console.log('🔍 API KEY inside app:', OPENAI_API_KEY);

app.use(cors());
app.use(express.json()); // Parse JSON bodies

app.use('/api/itinerary', itineraryRouter);
// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Export app for server.js or index.js
export default app;

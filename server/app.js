import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Export app for server.js or index.js
export default app;

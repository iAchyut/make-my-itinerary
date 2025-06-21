// server/config.js
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error('❌ OPENAI_API_KEY is missing in .env');
}

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const PORT = process.env.PORT || 5000;
export const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

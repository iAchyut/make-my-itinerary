import { PORT,OPENAI_API_KEY } from './config.js';
import app from './app.js';
import connectDB from './routes/db.js';

let PR = PORT || 5000;
console.log("🔍 API KEY inside index:", OPENAI_API_KEY);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
});
import { PORT,OPENAI_API_KEY } from './config.js';
import app from './app.js';

let PR = PORT || 5000;
console.log("🔍 API KEY inside index:", OPENAI_API_KEY);

app.listen(PR, () => {
  console.log(`🚀 Server itinerrary running at http://localhost:${PORT}`);
});
🚀 AI Career & Skill Development Advisor
📌 Overview

The AI Career & Skill Development Advisor is an intelligent web application that helps students plan their future careers. It analyzes skills, experience, and interests to provide personalized career recommendations, generates a roadmap with skill-building courses (YouTube integration), and matches students with internship opportunities based on their chosen career path.

🛠️ Tech Stack

Frontend

⚛️ React – UI framework 

🎨 Tailwind CSS – Styling 

🌀 Framer Motion – Animations

📊 Recharts – Data visualization

🌌 Three.js, tsParticles, Vanta.js – Interactive graphics

🗂️ Zustand – State management

🌐 Axios – API communication

Backend

🟢 Node.js + Express.js – REST API

🍃 MongoDB + Mongoose – Database

🔑 JWT + bcrypt – Authentication & security

⚡ Redis – Caching & sessions

🤖 OpenAI / Ollama – AI-powered career recommendations

🕷️ Puppeteer + Cheerio – Internship scraping

Dev Tools

📦 Nodemon – Auto-restart server

🔧 dotenv – Config management

⚙️ Setup
1. Clone Repository
git clone https://github.com/your-username/ai-career-advisor.git
cd ai-career-advisor

2. Install Dependencies
Frontend
cd client
npm install

Backend
cd server
npm install

3. Environment Variables

Create a .env file in /server with:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
OPENAI_API_KEY=your_openai_key
OLLAMA_API_URL=http://localhost:11434/api


👉 OLLAMA_API_URL points to your local Ollama server.
By default, Ollama runs on http://localhost:11434, but you can change it if deployed remotely.

4. Run Ollama (Required for AI features)

Make sure Ollama is installed → Download Ollama

Start the Ollama service:

ollama serve

Pull the required model :

ollama pull gemma3:4b

5. Run Application
Backend
cd server
npm run dev

Frontend
cd client
npm run dev

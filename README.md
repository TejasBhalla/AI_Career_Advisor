# 🚀 AI Career & Skill Development Advisor  

## 📌 Overview  
The **AI Career & Skill Development Advisor** is an intelligent web application that helps students plan their future careers.  
It analyzes **skills, experience, and interests** to provide personalized **career recommendations**, generates a **roadmap with skill-building courses (YouTube integration)**, and matches students with **internship opportunities** based on their chosen career path.  

---

## 🛠️ Tech Stack  

### **Frontend**  
- ⚛️ React – UI framework  
- 🎨 Tailwind CSS – Styling  
- 🌀 Framer Motion – Animations  
- 📊 Recharts – Data visualization  
- 🌌 Three.js, tsParticles, Vanta.js – Interactive graphics  
- 🗂️ Zustand – State management  
- 🌐 Axios – API communication  

### **Backend**  
- 🟢 Node.js + Express.js – REST API  
- 🍃 MongoDB + Mongoose – Database  
- 🔑 JWT + bcrypt – Authentication & security  
- ⚡ Redis – Caching & sessions  
- 🤖 OpenAI / Ollama – AI-powered career recommendations  
- 🕷️ Puppeteer + Cheerio – Internship scraping  

### **Dev Tools**  
- 📦 Nodemon – Auto-restart server  
- 🔧 dotenv – Config management  

---

## ⚙️ Setup  

### **1. Clone Repository**
```bash
git clone https://github.com/TejasBhalla/AI_Career_Advisor.git
cd AI_Career_Advisor
```
### **2. Install Dependencies**

### Frontend
```bash
cd frontend
npm install
```

### Backend
```bash
cd backend
npm install
```

## **3. Environment Variables**

Create a `.env` file inside `/backend` with:

```env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
YOUTUBE_API_KEY=your_key
REDIS_URL=your_redis_url
OPENAI_API_KEY=your_openai_key
OLLAMA_API_URL=http://localhost:11434/api
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_strong_secret
```

👉 **OLLAMA_API_URL** points to your local Ollama server.  
By default, Ollama runs on `http://localhost:11434`, but you can change it if deployed remotely.

---

## **4. Run Ollama (Required for AI features)**

Make sure Ollama is installed → [Download Ollama](https://ollama.ai)

Start the Ollama service:
```bash
ollama serve
```

## 4. Run Ollama (Required for AI features)

Pull the required model:
```bash
ollama pull gemma3:4b
```
# 🚀 Run Application

### Backend
```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev
```

# ✨ Features

- 🔐 **Student Authentication** – Secure login/signup with JWT  
- 🧾 **Profile Setup** – Students enter skills, experience, and interests  
- 🎯 **AI Career Advisor** – Personalized career suggestions using AI  
- 🛤️ **Skill Roadmap Generator** – AI + YouTube API for skill-learning roadmap  
- 💼 **Internship Finder** – Matches internships to chosen career path  
- 📊 **Progress Tracker** – Visual progress of skill-building journey  

---

# 🔄 Technical Workflow

1. **User Authentication** → JWT-secured login/signup  
2. **Profile Setup** → Student enters skills, interests, and experience  
3. **AI Career Advisor** → OpenAI/Ollama generates personalized career paths  
4. **Skill Roadmap** → AI + YouTube API suggests courses with structured roadmap  
5. **Internship Finder** → Scrapes job boards using Puppeteer + Cheerio  
6. **Progress Tracker** → Tracks completed skills, courses, and internships  


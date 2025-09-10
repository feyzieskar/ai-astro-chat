# 🌌 AI Astro Chat

**AI Astro Chat** is a modern, AI-powered astrology companion that generates personalized astrological personality analyses based on users' birth details. It leverages the **Gemini AI** model to interpret the **Sun**, **Moon**, and **Ascendant signs** with empathy and insight — all through a sleek frontend and a Node.js backend.

## ✨ Features

- 🌞 **Sun Sign Detection** (based on date of birth)
- 🌙 **Fixed Moon Sign** (customizable)
- ⬆️ **Ascendant Input** (manual or via integrated calculator widget)
- 💬 **AI-Powered Personality Analysis** using [Gemini 2.0 Flash](https://deepmind.google/discover/blog/google-gemini-ai/)
- ⚛️ Built with **React**, **Express**, **Node.js**
- 🔐 Secure `.env` for Gemini API key
- 🎨 Responsive and clean UI (with Tailwind CSS)

## 🖼️ How It Works

1. The user provides their birth date and time.
2. Sun sign is automatically calculated.
3. User either selects their Ascendant or uses the embedded calculator.
4. The backend sends a structured prompt to Gemini AI.
5. The response is a short but personalized personality analysis — directly addressing the user.

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/feyzieskar/ai-astro-chat.git
cd ai-astro-chat
```

### 2. Set Up Environment Variables

Create a `.env` file in the `server` folder:

```env
# server/.env
GEMINI_API_KEY=your-api-key-here
```

Or copy from example:
```bash
cp server/.env.example server/.env
```

> Get your API key from [makersuite.google.com](https://makersuite.google.com/).

### 3. Install & Run

#### Backend

```bash
cd server
npm install
node index.js
```

#### Frontend

```bash
cd client
npm install
npm run dev
```

Then visit: [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
.
├── client/         # Frontend (React + Tailwind)
├── server/         # Backend (Express)
└── README.md       # You're reading it!
```


## 🛡️ Security Note

Your `.env` file is **excluded via `.gitignore`**. Never share your Gemini API key publicly. Always use `.env.example` as a reference for collaborators.

## 🙋‍♂️ Contributing

Pull requests are welcome! Feel free to open an issue or suggest improvements.

## 📜 License

MIT License © 2025 Feyzi Eşkar

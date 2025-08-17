# 🌐 Zenith Finance – AI-Powered Personal Finance Tracker

**Zenith Finance** is a modern, full-stack web application designed to help users take control of their finances through intelligent tracking, visualization, and **AI-powered insights**.  

The application automates tedious tasks like categorizing expenses and provides personalized advice to improve financial health.

---

## ✨ Features

### 🔑 Core Features
- **Secure Authentication** – JWT-based user registration & login.  
- **Transaction Management** – Full CRUD (Create, Read, Update, Delete) support for income and expenses.  
- **Interactive Dashboard** – Central hub to view key financial metrics.  
- **Data Visualization** – Beautiful doughnut charts (Recharts) breaking down expenses by category.  
- **Financial Health Score** – Real-time score (0–100) to assess income vs. expenses.  
- **Dual Theme** – Light and Dark mode UI.  
- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile.  

### 🧠 AI-Powered Features
- **Automatic Categorization** – Uses Google Gemini API to suggest categories (e.g., “Starbucks Coffee” → “Food & Drink”).  
- **Personalized Insights** – Analyzes last 30 days of spending to generate **actionable financial tips**.  

---

## 🛠️ Tech Stack

| Category     | Technology |
|--------------|------------|
| **Frontend** | React.js, TypeScript, Tailwind CSS, shadcn/ui, Recharts, Vite |
| **Backend**  | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **AI / GenAI** | Google Gemini API |
| **Auth**     | JWT (jsonwebtoken), bcryptjs |

---

## 📂 Project Structure

```
finance-tracker/
├── frontend/         # React.js client application
├── backend/          # Node.js/Express API server
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js (v18 or later)  
- npm or yarn  
- MongoDB (local or Atlas)  
- Google Gemini API Key  

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/finance-tracker.git
cd finance-tracker
```

---

### 2. Setup Environment Variables

Create a `.env` file in the **root** of the project:  

```env
# MongoDB Connection String
MONGO_URI="your_mongodb_connection_string"

# JWT Secret
JWT_SECRET="your_long_random_secret_string"

# Google Gemini API Key
GOOGLE_API_KEY="your_gemini_api_key"
```

---

### 3. Install & Run Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start backend server
npm start
```

➡ Backend runs at: **http://localhost:3002**  

---

### 4. Install & Run Frontend

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend dev server
npm run dev
```

➡ Frontend runs at: **http://localhost:5173**  

---

## 📝 API Endpoints

| Method | Endpoint                       | Description                         | Protected |
|--------|--------------------------------|-------------------------------------|-----------|
| POST   | `/api/auth/register`           | Register a new user                 | ❌        |
| POST   | `/api/auth/login`              | Login an existing user              | ❌        |
| GET    | `/api/transactions`            | Get all transactions                | ✅        |
| POST   | `/api/transactions`            | Add a new transaction               | ✅        |
| DELETE | `/api/transactions/:id`        | Delete transaction by ID            | ✅        |
| POST   | `/api/transactions/categorize` | Suggest category via AI             | ✅        |
| GET    | `/api/insights/summary`        | Dashboard data + AI-generated tips  | ✅        |

---

## 📸 Screenshots (Optional)
_Add some screenshots/gifs of the dashboard & charts here._  

---

## 🤝 Contributing

1. Fork the repo  
2. Create a new branch (`feature/new-feature`)  
3. Commit changes  
4. Push to branch & open a PR  

---

## 📜 License

This project is licensed under the **MIT License**.  

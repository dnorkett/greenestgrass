# GreenestGrass

**GreenestGrass** is a web-based application that allows users to compare multiple cities based on key factors such as weather, culture, cost of living, and job opportunities. The app leverages OpenAI's `gpt-4o-mini` model to generate detailed comparisons and displays the results in a user-friendly table.

---

## Features

### Frontend
- **City Input Form**: Users can input at least two cities and dynamically add more for comparison.
- **Comparison Results Table**: Displays the comparison results in a responsive table format.
- **Error Handling**: Clear error messages for invalid inputs or server issues.
- **Responsive Design**: Works on all modern browsers and devices.

### Backend
- **City Comparison API**: Accepts a list of cities and uses OpenAI's `gpt-4o-mini` model for generating insights.
- **Error Handling**: Validates input and returns meaningful errors.
- **Scalability**: Handles multiple cities in a single request.

---

## Installation

### Prerequisites
- Node.js (v16 or later)
- npm (Node Package Manager)
- OpenAI API Key

### Setup Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/greenestgrass.git
   cd greenestgrass
   ```

2. **Install dependencies** for both backend and frontend:
   ```bash
   # Backend setup
   cd backend
   npm install

   # Frontend setup
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the `backend` directory with the following content:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start the backend server**:
   ```bash
   cd backend
   npm start
   ```

5. **Start the frontend server**:
   ```bash
   cd ../frontend
   npm start
   ```

6. **Open the application in your browser**:  
   [http://localhost:3000](http://localhost:3000)

---

## 📡 API Reference

### Endpoint
```
POST /chat
```

### Request Body
```json
{
  "cities": ["City1", "City2", "City3"]
}
```

### Response
```json
{
  "cities": [
    {
      "name": "City1",
      "weather": "Sunny",
      "culture": "Vibrant",
      "costOfLiving": "High",
      "jobOpportunities": "Abundant"
    },
    {
      "name": "City2",
      "weather": "Rainy",
      "culture": "Traditional",
      "costOfLiving": "Moderate",
      "jobOpportunities": "Limited"
    }
  ]
}
```

---

## Project Structure
```
greenestgrass/
├── backend/               # Backend code
│   ├── index.js           # Main backend server
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables (not included in repo)
├── frontend/              # Frontend code
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── CityForm.js
│   │   │   ├── ResultTable.js
│   │   └── App.js         # Main React app
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
```

---

## Future Enhancements

- Add more comparison factors (e.g., education, healthcare, safety).
- Allow users to save and share comparisons.
- Integrate external APIs for real-time data.
- Add user authentication for personalized features.

---

## License

This project is licensed under the MIT License. 

---

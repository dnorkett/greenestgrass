# Product Requirements Document (PRD)

## Project Name: GreenestGrass - City Comparison Application
**Date:** May 24, 2025  
**Author:** [Don Norkett]  

---

## 1. Overview
The GreenestGrass application is a web-based tool that allows users to compare multiple cities based on key factors such as weather, culture, cost of living, and job opportunities. The application leverages OpenAI's `gpt-4o-mini` model to generate detailed comparisons in JSON format, which are then displayed in a user-friendly table.

---

## 2. Goals and Objectives
- Provide users with an intuitive interface to compare cities.  
- Allow users to dynamically add more cities for comparison.  
- Display results in a clear, tabular format.  
- Ensure the application is scalable, maintainable, and easy to enhance in the future.  

---

## 3. Features

### Frontend Features
1. **City Input Form**
   - Users can input at least two cities to compare.  
   - A "+ Add City" button allows users to add more cities dynamically.  
   - Validation ensures at least two cities are provided before submission.  

2. **Comparison Results Table**
   - Displays the comparison results in a table format.  
   - Dynamically adjusts to show all cities and their attributes.  
   - Handles errors gracefully (e.g., invalid input or server errors).  

3. **Responsive Design**
   - The application is fully responsive and adjusts to different screen sizes.  
   - Uses Bootstrap for styling and layout.  

---

### Backend Features
1. **City Comparison API**
   - Accepts a POST request with an array of cities.  
   - Validates the input to ensure at least two cities are provided.  
   - Generates a dynamic prompt for OpenAI's `gpt-4o-mini` model.  
   - Returns a JSON response with city comparisons.  

2. **Error Handling**
   - Handles invalid input with appropriate error messages.  
   - Logs errors for debugging and troubleshooting.  

3. **Scalability**
   - Designed to handle multiple cities in a single request.  
   - Modular code structure for easy enhancements.  

---

## 4. User Stories

### As a User:
1. I want to input at least two cities so that I can compare them.  
2. I want to dynamically add more cities to the comparison.  
3. I want to see the comparison results in a table format.  
4. I want to receive clear error messages if something goes wrong.  

### As a Developer:
1. I want the code to be modular and easy to maintain.  
2. I want clear error logs to debug issues quickly.  
3. I want the application to be scalable for future enhancements.  

---

## 5. Technical Requirements

### Frontend
- **Framework:** React.js  
- **Styling:** Bootstrap  
- **State Management:** React's `useState` hook  
- **API Communication:** Fetch API  

### Backend
- **Framework:** Express.js  
- **Environment Management:** dotenv  
- **AI Integration:** OpenAI's `gpt-4o-mini` model  
- **Error Handling:** Custom error messages and logging  

---

## 6. API Specifications

### Endpoint: `/chat`
- **Method:** POST  
- **Request Body:**  
  ```json
  {
    "cities": ["City1", "City2", "City3"]
  }
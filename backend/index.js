import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    // Check for the cities array in the request body
    const { cities } = req.body;

    if (!Array.isArray(cities) || cities.length < 2) {
      return res.status(400).json({ 
        error: "Please provide an array of at least two cities." 
      });
    }

    // Build a dynamic prompt listing all cities
    const cityListString = cities.join(", ");
    const cityJSONEntries = cities
      .map(
        (city) => `{
        "name": "${city}",
        "weather": "...",
        "culture": "...",
        "costOfLiving": "...",
        "jobOpportunities": "..."
      }`
      )
      .join(",\n    ");

    const prompt = `
Compare the following cities and their suburbs in terms of weather, culture, cost of living, and job opportunities: ${cityListString}.
Return ONLY a valid JSON object in this format:
{
  "cities": [
    ${cityJSONEntries}
  ]
}
Do not include any explanation or text outside the JSON.
`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini", // Changed to correct model name
      response_format: { type: "json_object" }
    });

    const data = JSON.parse(completion.choices[0].message.content);
    res.json(data);

  } catch (error) {
    console.error('Error details:', error);
    
    // More specific error handling
    if (error.response) {
      res.status(error.response.status).json({ 
        error: `OpenAI API error: ${error.response.data.error.message}` 
      });
    } else {
      res.status(500).json({ 
        error: "An error occurred while processing your request." 
      });
    }
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

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
  // Check for the "cities" array; if not provided, use city1 and city2
  let cities;
  if (Array.isArray(req.body.cities) && req.body.cities.length >= 2) {
    cities = req.body.cities;
  } else {
    const { city1, city2 } = req.body;
    if (!city1 || !city2) {
      return res.status(400).json({ error: "Please provide at least two cities." });
    }
    cities = [city1, city2];
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
Compare the following cities in terms of weather, culture, cost of living, and job opportunities: ${cityListString}.
Return ONLY a valid JSON object in this format:
{
  "cities": [
    ${cityJSONEntries}
  ]
}
Do not include any explanation or text outside the JSON.
`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      response_format: { type: "json_object" }
    });

    // Parse the JSON response from OpenAI
    const data = JSON.parse(completion.choices[0].message.content);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

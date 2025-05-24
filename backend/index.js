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
  const { city1, city2 } = req.body;

  if (!city1 || !city2) {
    return res.status(400).json({ error: "Please provide two cities." });
  }

  const prompt = `Compare ${city1} and ${city2} in terms of weather, culture, cost of living, and job opportunities. Be concise and helpful.`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

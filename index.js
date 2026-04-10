import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 DEBUG

    const message = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "Eres un asistente financiero.",
        },
        { role: "user", content: message },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.log("ERROR REAL:", error); // 👈 CLAVE
    res.status(500).json({ error: "Error en IA" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor activo");
});
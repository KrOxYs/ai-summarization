// summarize.js
const axios = require("axios");
const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

async function summarizeText(text, minLength = 100, maxLength = 200) {
  if (!text) {
    console.error("Error: Text input is required.");
    return;
  }
  const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        inputs: text,
        parameters: {
          min_length: minLength,
          max_length: maxLength,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        },
      }
    );
    console.log("Original length:", text.length);
    console.log("Summary:", response.data[0].summary_text);
    console.log("length:", response.data[0].summary_text.length);

    return response.data[0].summary_text;
  } catch (error) {
    console.error(
      "Error summarizing text:",
      error.response?.data || error.message
    );
  }
}
app.post("/summarize", async (req, res) => {
  const { text, minLength, maxLength } = req.body;
  // Function to summarize text
  try {
    const summary = await summarizeText(text, minLength, maxLength);
    if (summary) {
      res.json({
        summary,
        originalLength: text.length,
        summaryLength: summary.length,
      });
    } else {
      res.status(400).json({ error: "Error summarizing text" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// // Example usage
// const inputText = `rápido progreso de la inteligencia artificial (IA) ha transformado sectores en todo el mundo. De la salud a la financiación, las tecnologías de la inteligencia artificial se utilizan para optimizar los procesos, mejorar la toma de decisiones y ofrecer soluciones innovadoras. Uno de los avances más notables de la inteligencia artificial es el procesamiento de lengua natural (PLN), que permite a las máquinas entender, interpretar y generar el lenguaje humano. Esto ha llevado al desarrollo de aplicaciones como chatbots, herramientas de traducción de lengua y generación automática de contenido. Por ejemplo, en la salud, los sistemas basados en la inteligencia artificial ayudan a realizar diagnósticos tempranos analizando datos y imágenes médicas. En la industria del automóvil, los automóviles se convierten en un algoritmo de procesamiento real.`;

// summarizeText(inputText);

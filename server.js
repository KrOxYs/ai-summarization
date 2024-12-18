// summarize.js
const axios = require("axios");

// Function to summarize text
async function summarizeText(text, minLength = 100, maxLength = 200) {
  if (!text) {
    console.error("Error: Text input is required.");
    return;
  }
  const HUGGINGFACE_API_KEY = "";

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
  } catch (error) {
    console.error(
      "Error summarizing text:",
      error.response?.data || error.message
    );
  }
}

// Example usage
const inputText = `The rapid advancement of artificial intelligence (AI) has transformed industries across the globe. From healthcare to finance, AI technologies are being leveraged to optimize processes, improve decision-making, and deliver innovative solutions. One of the most notable advancements in AI is natural language processing (NLP), which enables machines to understand, interpret, and generate human language. This has led to the development of applications such as chatbots, language translation tools, and automated content generation.

For instance, in healthcare, AI-powered systems are assisting in early diagnosis by analyzing medical data and imaging. Similarly, in the automotive industry, self-driving cars are becoming a reality thanks to machine learning algorithms that can process vast amounts of sensor data in real time. However, despite these advancements, the adoption of AI also raises ethical concerns, including biases in AI models and the potential loss of jobs due to automation.

As industries continue to integrate AI into their operations, it is crucial to balance technological innovation with ethical considerations. Policymakers, researchers, and industry leaders must collaborate to ensure that AI systems are transparent, fair, and beneficial for all.`;

summarizeText(inputText);

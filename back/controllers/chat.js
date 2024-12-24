const cohere = require("../utils/cohere");

const sendMesssageToAi = async (req, res) => {
  try {
    // Initialize chat history (you can modify this as needed)
    const chatHistory = [
      { role: "User", message: "This is a test message, is this working?" },
      {
        role: "Chatbot",
        message:
          "Yes, your message has been received, and I am able to respond! How can I assist you today?",
      },
    ];

    // Stream the response from Cohere's chatStream
    const stream = await cohere.chatStream({
      model: "command-r-08-2024", // Use the desired Cohere model
      message: req.body.message,
      temperature: 0.3, // Set response creativity
      chatHistory, // Include your chat history
      promptTruncation: "AUTO",
      connectors: [{ id: "web-search" }], // You can adjust or remove connectors as needed
    });

    // Stream the chatbot response back to the frontend
    let botMessage = "";
    for await (const chat of stream) {
      if (chat.eventType === "text-generation") {
        botMessage += chat.text;
      }
    }

    res.json({ message: botMessage.trim() });
  } catch (error) {
    console.error(
      "Error during Cohere API call:",
      error.message || error.response.data
    );
    res.status(500).json({ error: "Something went wrong on the server." });
  }
};

module.exports = { sendMesssageToAi };

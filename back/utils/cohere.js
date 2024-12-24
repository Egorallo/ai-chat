const dotenv = require("dotenv");
const { CohereClient } = require("cohere-ai");
dotenv.config();

// Initialize Cohere client with your API key from the .env file
module.exports = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const rateLimit = require("express-rate-limit"); // Import the rate limit package

// Set up rate limiter: maximum of 3 requests per minute
module.exports = rateLimit({
  windowMs: 60 * 1000, // 1 minute of window
  max: 3, // Limit each IP to 3 requests per minute
  message: "Too many requests, please try again later.",
  handler: (req, res) => {
    res
      .status(429)
      .json({ error: "Too many requests, please try again later." });
  },
});

const express = require("express");
const { sendMesssageToAi } = require("../controllers/chat")

const router = express.Router();

router.post("/chat", sendMesssageToAi);

module.exports = router;

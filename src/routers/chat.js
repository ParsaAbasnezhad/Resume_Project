const express = require("express");
const router = express.Router()
const projectController = require("../controllers/chat-controller")

router.get("/chat", projectController.chatController)
router.post("/chat-post", projectController.postChatController);
module.exports = router;
const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// GET all feedbacks
router.get("/", feedbackController.getAllFeedbacks);

// POST new feedback
router.post("/", feedbackController.submitFeedback);

module.exports = router;

const Feedback = require("../models/Feedback");

// Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit new feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const feedback = new Feedback({
      name,
      email,
      message,
    });

    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

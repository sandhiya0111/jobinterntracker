const Job = require("../models/Job");

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.session.sub }).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get jobs",
      error: error.message,
    });
  }
};

// Get single job
const getJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.session.sub });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get job",
      error: error.message,
    });
  }
};

// Create job
const createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, user: req.session.sub });

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create job",
      error: error.message,
    });
  }
};

// Update job
const updateJob = async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.user;

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.session.sub },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update job",
      error: error.message,
    });
  }
};

// Delete job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.session.sub });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete job",
      error: error.message,
    });
  }
};

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};

const express = require("express");
const { requireSession } = require("../middleware/authMiddleware");

const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

router.use(requireSession);

router.get("/", getJobs);

router.get("/:id", getJob);

router.post("/", createJob);

router.put("/:id", updateJob);

router.delete("/:id", deleteJob);

module.exports = router;
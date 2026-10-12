import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddJob() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    type: "Internship",
    location: "",
    appliedDate: "",
    status: "Applied",
    jobUrl: "",
    notes: "",
  });


  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/jobs",
        formData,
        { withCredentials: true }
      );

      alert("Application added successfully!");

      navigate("/jobs");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to add application. Check your backend."
      );

    }

  };


  return (

    <main className="page">

      <div className="page-header">

        <div>

          <p className="section-label">
            NEW APPLICATION
          </p>

          <h1>
            Add Job / Internship
          </h1>

          <p>
            Keep your career opportunities organized.
          </p>

        </div>

      </div>


      <form
        className="form"
        onSubmit={handleSubmit}
      >

        <div className="form-title">
          <span>✨</span>

          <div>
            <h2>
              Application Details
            </h2>

            <p>
              Enter information about the opportunity.
            </p>
          </div>
        </div>


        <div className="form-group">

          <label>
            Company Name
          </label>

          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Google"
            required
          />

        </div>


        <div className="form-group">

          <label>
            Position
          </label>

          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer Intern"
            required
          />

        </div>


        <div className="form-group">

          <label>
            Application Type
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >

            <option value="Internship">
              🎓 Internship
            </option>

            <option value="Job">
              💼 Job
            </option>

          </select>

        </div>


        <div className="form-group">

          <label>
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Chennai / Remote"
            required
          />

        </div>


        <div className="form-group">

          <label>
            Applied Date
          </label>

          <input
            type="date"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
            required
          />

        </div>


        <div className="form-group">

          <label>
            Current Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >

            <option value="Applied">
              Applied
            </option>

            <option value="Interview">
              Interview
            </option>

            <option value="Selected">
              Selected
            </option>

            <option value="Rejected">
              Rejected
            </option>

            <option value="Offer">
              Offer
            </option>

          </select>

        </div>


        <div className="form-group full">

          <label>
            Job URL
          </label>

          <input
            type="url"
            name="jobUrl"
            value={formData.jobUrl}
            onChange={handleChange}
            placeholder="https://company.com/job"
          />

        </div>


        <div className="form-group full">

          <label>
            Notes
          </label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add notes about this opportunity..."
          />

        </div>


        <div className="form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/jobs")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="submit-button"
          >
            ✨ Save Application
          </button>

        </div>

      </form>

    </main>

  );
}

export default AddJob;

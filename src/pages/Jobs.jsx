import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import JobCard from "../components/JobCard";

function Jobs() {

  const { type } = useParams();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/jobs", { withCredentials: true })

      .then((response) => {
        setJobs(response.data);
      })

      .catch((error) => {
        console.error(error);
      })

      .finally(() => {
        setLoading(false);
      });

  }, []);


  const deleteJob = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/jobs/${id}`,
        { withCredentials: true }
      );

      setJobs((currentJobs) =>
        currentJobs.filter(
          (job) => job._id !== id
        )
      );

    } catch (error) {

      console.error(error);

      alert("Unable to delete application.");

    }
  };


  const visibleJobs = type
    ? jobs.filter((job) => job.type === type)
    : jobs;


  const pageTitle = type
    ? `My ${type} Applications`
    : "My Applications";


  if (loading) {

    return (

      <main className="page">

        <div className="loading-page">

          <div className="spinner"></div>

          Loading applications...

        </div>

      </main>

    );

  }


  return (

    <main className="page">

      <div className="page-header">

        <div>

          <p className="section-label">
            APPLICATIONS
          </p>

          <h1>
            {pageTitle}
          </h1>

          <p>
            Manage and track all your opportunities.
          </p>

        </div>

        <Link
          to="/add-job"
          className="hero-button"
        >
          + Add Application
        </Link>

      </div>


      {visibleJobs.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">
            📭
          </div>

          <h3>
            No applications found
          </h3>

          <p>
            Add your first job or internship application.
          </p>

          <Link
            to="/add-job"
            className="hero-button"
          >
            Add Application
          </Link>

        </div>

      ) : (

        <div className="job-grid">

          {visibleJobs.map((job) => (

            <JobCard
              key={job._id}
              job={job}
              onDelete={deleteJob}
            />

          ))}

        </div>

      )}

    </main>

  );
}

export default Jobs;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/jobs", { withCredentials: true })

      .then((response) => {
        setJobs(response.data);
      })

      .catch((error) => {
        console.error(error);

        setLoadError(
          "Unable to connect to the backend. Make sure your server is running."
        );
      })

      .finally(() => {
        setLoading(false);
      });

  }, []);

  const jobCount =
    jobs.filter((job) => job.type === "Job").length;

  const internshipCount =
    jobs.filter((job) => job.type === "Internship").length;

  const interviewCount =
    jobs.filter((job) => job.status === "Interview").length;

  const selectedCount =
    jobs.filter((job) => job.status === "Selected").length;

  const recentJobs = jobs.slice(0, 5);

  return (

    <main className="dashboard-page">

      {/* HERO */}

      <section className="dashboard-hero">

        <div className="hero-content">

          <span className="hero-badge">
            🚀 CAREER APPLICATION TRACKER
          </span>

          <h1>
            Take control of your
            <span> career journey.</span>
          </h1>

          <p>
            Track jobs, internships, interviews and offers
            from one beautiful dashboard.
          </p>

          <Link
            to="/add-job"
            className="hero-button"
          >
            + Add New Application
          </Link>

        </div>

        <div className="hero-decoration">

          <div className="floating-card card-one">
            💼
            <span>Applications</span>
          </div>

          <div className="floating-card card-two">
            🎯
            <span>Stay Focused</span>
          </div>

          <div className="hero-circle">
            🚀
          </div>

        </div>

      </section>


      {/* ERROR */}

      {loadError && (
        <div className="error-message">
          ⚠️ {loadError}
        </div>
      )}


      {/* STATISTICS */}

      <section className="stats-grid">

        <Link to="/jobs" className="stat-card purple">

          <div className="stat-icon">
            📊
          </div>

          <div>
            <p>Total Applications</p>

            <h2>
              {loading ? "..." : jobs.length}
            </h2>

            <span>
              All applications
            </span>
          </div>

        </Link>


        <Link
          to="/jobs/type/Job"
          className="stat-card blue"
        >

          <div className="stat-icon">
            💼
          </div>

          <div>
            <p>Jobs</p>

            <h2>
              {loading ? "..." : jobCount}
            </h2>

            <span>
              Full-time opportunities
            </span>
          </div>

        </Link>


        <Link
          to="/jobs/type/Internship"
          className="stat-card orange"
        >

          <div className="stat-icon">
            🎓
          </div>

          <div>
            <p>Internships</p>

            <h2>
              {loading ? "..." : internshipCount}
            </h2>

            <span>
              Learning opportunities
            </span>
          </div>

        </Link>


        <div className="stat-card green">

          <div className="stat-icon">
            🎯
          </div>

          <div>
            <p>Interviews</p>

            <h2>
              {loading ? "..." : interviewCount}
            </h2>

            <span>
              Opportunities in progress
            </span>
          </div>

        </div>

      </section>


      {/* PROGRESS */}

      <section className="progress-section">

        <div>

          <p className="section-label">
            YOUR PROGRESS
          </p>

          <h2>
            Keep moving forward 🚀
          </h2>

          <p>
            Every application is one step closer
            to your next opportunity.
          </p>

        </div>

        <div className="progress-box">

          <div className="progress-item">

            <div>
              <span>Applications</span>
              <strong>{jobs.length}</strong>
            </div>

            <div className="progress-bar">
              <span
                style={{
                  width: `${Math.min(
                    jobs.length * 10,
                    100
                  )}%`,
                }}
              />
            </div>

          </div>


          <div className="progress-item">

            <div>
              <span>Interviews</span>
              <strong>{interviewCount}</strong>
            </div>

            <div className="progress-bar blue-bar">
              <span
                style={{
                  width: `${Math.min(
                    interviewCount * 20,
                    100
                  )}%`,
                }}
              />
            </div>

          </div>


          <div className="progress-item">

            <div>
              <span>Selected</span>
              <strong>{selectedCount}</strong>
            </div>

            <div className="progress-bar green-bar">
              <span
                style={{
                  width: `${Math.min(
                    selectedCount * 25,
                    100
                  )}%`,
                }}
              />
            </div>

          </div>

        </div>

      </section>


      {/* RECENT APPLICATIONS */}

      <section className="recent-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              LATEST ACTIVITY
            </p>

            <h2>
              Recent Applications
            </h2>
          </div>

          <Link
            to="/jobs"
            className="view-all"
          >
            View All →
          </Link>

        </div>


        {loading ? (

          <div className="loading">
            <div className="spinner"></div>
            Loading applications...
          </div>

        ) : recentJobs.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              📂
            </div>

            <h3>
              No applications yet
            </h3>

            <p>
              Start tracking your job search today.
            </p>

            <Link
              to="/add-job"
              className="hero-button"
            >
              Add First Application
            </Link>

          </div>

        ) : (

          <div className="recent-list">

            {recentJobs.map((job) => (

              <Link
                key={job._id}
                to={`/jobs/type/${job.type}`}
                className="recent-item"
              >

                <div className="recent-icon">
                  {job.company?.charAt(0).toUpperCase()}
                </div>

                <div className="recent-details">

                  <strong>
                    {job.position}
                  </strong>

                  <span>
                    {job.company}
                  </span>

                </div>

                <span
                  className={`status status-${job.status?.toLowerCase()}`}
                >
                  {job.status}
                </span>

                <span className="recent-date">
                  {new Date(
                    job.appliedDate
                  ).toLocaleDateString()}
                </span>

              </Link>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default Home;

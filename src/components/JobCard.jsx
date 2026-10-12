function JobCard({ job, onDelete }) {
  return (
    <div className="job-card">

      <div className="job-card-top">
        <div className="company-icon">
          {job.company?.charAt(0).toUpperCase()}
        </div>

        <span className={`status status-${job.status?.toLowerCase()}`}>
          {job.status}
        </span>
      </div>

      <h2>{job.position}</h2>

      <p className="company-name">
        {job.company}
      </p>

      <div className="job-info">
        <p>
          📍 <strong>Location</strong>
          <span>{job.location}</span>
        </p>

        <p>
          💼 <strong>Type</strong>
          <span>{job.type}</span>
        </p>

        <p>
          📅 <strong>Applied</strong>
          <span>
            {new Date(job.appliedDate).toLocaleDateString()}
          </span>
        </p>
      </div>

      <div className="job-card-footer">

        {job.jobUrl && (
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noreferrer"
            className="view-button"
          >
            View Job ↗
          </a>
        )}

        <button
          className="delete-button"
          onClick={() => onDelete(job._id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default JobCard;

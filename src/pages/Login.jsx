import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        isRegistering ? "/api/auth/register" : "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, email, password }),
        }
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Authentication failed.");

      if (isRegistering) {
        setIsRegistering(false);
        setPassword("");
        setNotice("Account created. Please log in to continue.");
        return;
      }

      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (submitError) {
      setError(submitError.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page auth-page">
      <section className="auth-card">
        <p className="section-label">JOBTRACK ACCOUNT</p>
        <h1>{isRegistering ? "Create your account" : "Welcome back"}</h1>
        <p className="auth-description">
          {isRegistering
            ? "Create an account to get started with JobTrack."
            : "Log in to your JobTrack account."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="auth-field">
              <label htmlFor="auth-name">Name</label>
              <input
                id="auth-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={80}
                required
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              autoComplete={isRegistering ? "new-password" : "current-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
            />
            {isRegistering && <small>Use at least 8 characters.</small>}
          </div>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="submit-button auth-submit" type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isRegistering
                ? "Create account"
                : "Log in"}
          </button>
        </form>

        <p className="auth-switch">
          {isRegistering ? "Already have an account? " : "New to JobTrack? "}
          <button
            type="button"
            onClick={() => {
              setIsRegistering((current) => !current);
              setError("");
              setNotice("");
            }}
          >
            {isRegistering ? "Log in" : "Create an account"}
          </button>
        </p>
        {notice && <p className="auth-notice" role="status">{notice}</p>}
        <Link className="auth-home-link" to="/">Back to dashboard</Link>
      </section>
    </main>
  );
}

export default Login;
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const [authState, setAuthState] = useState("checking");
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/auth/me", {
      credentials: "include",
      signal: controller.signal,
    })
      .then((response) => {
        if (response.status === 401) {
          setAuthState("unauthenticated");
        } else {
          setAuthState(response.ok ? "authenticated" : "error");
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setAuthState("error");
      });

    return () => controller.abort();
  }, []);

  if (authState === "checking") {
    return <main className="page">Checking your session...</main>;
  }

  if (authState === "unauthenticated") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (authState === "error") {
    return (
      <main className="page">
        <p className="error-message" role="alert">
          Unable to verify your login. Please try again shortly.
        </p>
      </main>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
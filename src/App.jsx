import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import AddJob from "./pages/AddJob";
import Login from "./pages/Login";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/jobs"
            element={<Jobs />}
          />

          <Route
            path="/jobs/type/:type"
            element={<Jobs />}
          />

          <Route
            path="/add-job"
            element={<AddJob />}
          />
        </Route>

        <Route
          path="/login"
          element={<Login />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;

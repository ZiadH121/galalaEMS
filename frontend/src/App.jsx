import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/events">Events</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<h2>Login Page</h2>} />
        <Route path="/events" element={<h2>Events Page</h2>} />
        <Route path="/dashboard" element={<h2>Admin Dashboard</h2>} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;

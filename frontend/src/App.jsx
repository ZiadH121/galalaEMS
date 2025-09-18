import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">GU EMS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/events">Events</Nav.Link>
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            </Nav>
            <Nav>
              {!user ? (
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              ) : (
                <>
                  <Navbar.Text className="me-3">
                    Welcome, {user.name}
                  </Navbar.Text>
                  <Button variant="outline-light" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main content */}
      <Container className="my-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Events />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </Container>

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-auto">
        <p className="mb-0">© 2025 Galala University EMS</p>
      </footer>
    </div>
  );
}

export default App;

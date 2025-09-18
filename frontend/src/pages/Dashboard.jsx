import { Table, Button } from "react-bootstrap";

function Dashboard() {
  // For MVP, we’ll just show placeholder events for now
  const pendingEvents = [
    { id: 1, title: "Club Fair", date: "2025-10-01", location: "Main Hall" },
    { id: 2, title: "Movie Night", date: "2025-10-05", location: "Auditorium" },
  ];

  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>
      <p>Approve or reject pending event proposals below.</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingEvents.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.date}</td>
              <td>{event.location}</td>
              <td>
                <Button variant="success" size="sm" className="me-2">
                  Approve
                </Button>
                <Button variant="danger" size="sm">
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Dashboard;

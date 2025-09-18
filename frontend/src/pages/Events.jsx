import { useEffect, useState } from "react";
import API from "../api/api";
import { Card, Button, Spinner, Row, Col } from "react-bootstrap";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await API.get("/events");
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  return (
    <div>
      <h2 className="mb-4">Approved Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {events.map((event) => (
            <Col key={event._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {new Date(event.date).toLocaleDateString()} @ {event.location}
                  </Card.Subtitle>
                  <Card.Text>{event.description}</Card.Text>
                  <Card.Text>
                    <strong>Capacity:</strong> {event.capacity}
                  </Card.Text>
                  <Button variant="primary">Register</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Events;

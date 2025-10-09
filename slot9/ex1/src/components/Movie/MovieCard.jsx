import { useState } from "react";
import { Card, Button, Badge, Modal, Toast, Row, Col } from "react-bootstrap";

function truncate(text, max = 110) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "..." : text;
}

function saveFavourite(movie) {
  const key = "favourites";
  const old = JSON.parse(localStorage.getItem(key) || "[]");
  const exists = old.some((m) => m.id === movie.id);
  if (!exists) localStorage.setItem(key, JSON.stringify([...old, movie]));
}

export default function MovieCard({ movie }) {
  const [showToast, setShowToast] = useState(false);
  const [open, setOpen] = useState(false);

  const onAddFavourite = () => {
    saveFavourite(movie);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          src={movie.poster}
          alt={movie.title}
          style={{ height: 220, objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="d-flex align-items-center gap-2">
            {movie.title}
            <Badge bg="info" className="text-dark">{movie.genre}</Badge>
          </Card.Title>
          <Card.Text className="text-secondary">{truncate(movie.description)}</Card.Text>
          <Row className="g-2 small text-muted">
            <Col>Year: <b>{movie.year}</b></Col>
            <Col>Country: <b>{movie.country}</b></Col>
            <Col>Duration: <b>{movie.duration}’</b></Col>
          </Row>
          <div className="d-flex gap-2 mt-3">
            <Button variant="primary" onClick={onAddFavourite}>
              Add to Favourites
            </Button>
            <Button variant="outline-secondary" onClick={() => setOpen(true)}>
              View Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="position-fixed"
        style={{ top: 20, right: 20, zIndex: 1080 }}
      >
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={1800} autohide>
          <Toast.Header>
            <strong className="me-auto">Favourites</strong>
          </Toast.Header>
          <Toast.Body>Added to favourites!</Toast.Body>
        </Toast>
      </div>

      <Modal show={open} onHide={() => setOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-2"><b>Genre:</b> {movie.genre}</p>
          <p className="mb-2"><b>Year:</b> {movie.year}</p>
          <p className="mb-2"><b>Country:</b> {movie.country}</p>
          <p className="mb-2"><b>Duration:</b> {movie.duration} minutes</p>
          <p className="mb-0"><b>Description:</b> {movie.description}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Spinner, Alert, Row, Col, Modal } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ movies }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [showDeregisterModal, setShowDeregisterModal] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUsername = loggedInUser.Username;

  const urlAPI = "https://movies-flix123-4387886b5662.herokuapp.com"; // API URL

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      console.log(loggedInUsername);
      try {
        const response = await fetch(`${urlAPI}/users/${loggedInUsername}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(JSON.stringify(response.body));
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    
        const userData = await response.json(); // Parse JSON response
        setUser(userData); // Set user data
        setFormData(userData); // Populate form data for editing
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    if (loggedInUsername) {
      fetchUserData();
    } else {
      setError("No logged-in username found.");
      setLoading(false);
    }
  }, [loggedInUsername]);

  // Filter user's favorite movies
  const favoriteMovies = movies.filter((m) => user?.FavoriteMovies.includes(m._id));

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Submit updated profile
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${urlAPI}/users/${loggedInUsername}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      //Notifies user of successful update
      alert("Profile updated successfully. Please log in again the continue.");

      //Clear LocalStorage and redirect to Login page
      localStorage.clear();
      window.location.href = "/login";
    } catch (err) {
      setError(err.message);
    }
  };

  // Deregister user
  const handleDeregister = async () => {
    try {
      const response = await fetch(`${urlAPI}/users/${loggedInUsername}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      localStorage.clear();
      alert("Account successfully deregistered.");
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setShowDeregisterModal(false);
    }
  };

  // Render loading spinner
  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  // Render error message
  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <div className="profile-view">
      <h1>User Profile</h1>
      {isEditing ? (
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="Username"
              value={formData.Username || ""}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formPasswrod">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              name="Password"
              value={formData.Password || ""}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={formData.Email || ""}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formDateOfBirth">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              name="Birthday"
              value={
                formData.Birthday 
                ? new Date(formData.Birthday).toISOString().split("T")[0]
                : ""
              }
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>{" "}
          <Button variant="secondary" onClick={handleEditToggle}>
            Cancel
          </Button>
        </Form>
      ) : (
        <div className="profile-details">
          <p>
            <strong>Username:</strong> {user.Username}
          </p>
          <p>
            <strong>Email:</strong> {user.Email}
          </p>
          <p>
            <strong>Birthday:</strong> {user.Birthday}
          </p>
          <Button variant="primary" onClick={handleEditToggle}>
            Edit Profile
          </Button>
          <br></br>
          <br></br>
          <Button variant="primary" onClick={() => setShowDeregisterModal(true)}>
            Deregister
          </Button>
        </div>
      )}

      <h2>Favorite Movies</h2>
      {favoriteMovies.length > 0 ? (
        <Row>
          {favoriteMovies.map((movie) => (
            <Col key={movie._id} sm={6} md={4} lg={3}>
              <MovieCard 
                movie={movie}
                user={user}
                updateFavorites={(updatedFavorites) => {
                setUser({ ...user, FavoriteMovies: updatedFavorites });
                }}
                loggedInUsername={user.Username}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No favorite movies added yet.</p>
      )}

      <Modal
        show={showDeregisterModal}
        onHide={() => setShowDeregisterModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deregistration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to deregister your account? This action cannot
          be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeregisterModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeregister}>
            Deregister
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// Prop validation
ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProfileView;

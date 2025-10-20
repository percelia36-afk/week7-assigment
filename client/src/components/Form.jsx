import React, { useState } from "react";

const Form = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    series: "",
    studio: "",
    genre: "",
    gamedescription: "",
    url: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://week7-assigment.onrender.com/games",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        await response.json(); // Parse response but don't store unused
        setMessage("Game added successfully!");
        setFormData({
          title: "",
          series: "",
          studio: "",
          genre: "",
          gamedescription: "",
          url: "",
        });
        // Call onSuccess callback if provided
        if (onSuccess) {
          setTimeout(() => onSuccess(), 1500); // Close modal after 1.5 seconds
        }
      } else {
        setMessage("Failed to add game. Please try again.");
      }
    } catch (error) {
      console.error("Error adding game:", error);
      setMessage("Error adding game. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h2>Add New Game</h2>

      {message && (
        <div
          style={{
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "4px",
            backgroundColor: message.includes("successfully")
              ? "#d4edda"
              : "#f8d7da",
            color: message.includes("successfully") ? "#155724" : "#721c24",
            border: `1px solid ${
              message.includes("successfully") ? "#c3e6cb" : "#f5c6cb"
            }`,
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="title"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Game Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
            placeholder="Enter game title"
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="url"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Image URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
            placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="series"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Series
          </label>
          <input
            type="text"
            id="series"
            name="series"
            value={formData.series}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
            placeholder="Enter game series (optional)"
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="studio"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Studio
          </label>
          <input
            type="text"
            id="studio"
            name="studio"
            value={formData.studio}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
            placeholder="Enter development studio"
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="genre"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Genre *
          </label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          >
            <option value="">Select a genre</option>
            <option value="JRPG">JRPG</option>
            <option value="RPG">RPG</option>
            <option value="Action-Adventure">Action-Adventure</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Strategy">Strategy</option>
            <option value="Simulation">Simulation</option>
            <option value="Sports">Sports</option>
            <option value="Racing">Racing</option>
            <option value="Fighting">Fighting</option>
            <option value="Platformer">Platformer</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Horror">Horror</option>
            <option value="Shooter">Shooter</option>
          </select>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="gamedescription"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Game Description
          </label>
          <textarea
            id="gamedescription"
            name="gamedescription"
            value={formData.gamedescription}
            onChange={handleChange}
            rows="4"
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "1rem",
              resize: "vertical",
            }}
            placeholder="Enter a description of the game"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? "#6c757d" : "#007bff",
            color: "white",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            width: "100%",
          }}
        >
          {isSubmitting ? "Adding Game..." : "Add Game"}
        </button>
      </form>
    </div>
  );
};

export default Form;

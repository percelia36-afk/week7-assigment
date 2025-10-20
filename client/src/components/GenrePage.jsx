import React, { useState, useEffect } from "react";
import Form from "./Form";

const GenrePage = ({ genre }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Delete game function
  const deleteGame = async (gameId) => {
    try {
      const response = await fetch(
        `https://week7-assigment.onrender.com/games/${gameId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the deleted game from local state immediately
        setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
        console.log("Game deleted successfully");
      } else {
        console.error("Failed to delete game");
      }
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  useEffect(() => {
    const fetchGamesByGenre = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://week7-assigment.onrender.com/games/${genre}`
        );
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error(`Error fetching ${genre} games:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchGamesByGenre();

    // Set up interval to refresh every 5 seconds
    const interval = setInterval(() => {
      fetchGamesByGenre();
    }, 5000);

    return () => clearInterval(interval);
  }, [genre]);

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>Loading {genre} games...</h2>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h2>{genre} Games</h2>
        <button
          onClick={toggleForm}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {showForm ? "Close Form" : "Add New Game"}
        </button>
      </div>

      {showForm && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "2rem",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80%",
              overflow: "auto",
              position: "relative",
            }}
          >
            <button
              onClick={toggleForm}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#666",
              }}
            >
              ×
            </button>
            <Form onSuccess={toggleForm} />
          </div>
        </div>
      )}

      {games.length === 0 ? (
        <div style={{ textAlign: "center", color: "#666", marginTop: "3rem" }}>
          <h3>No {genre} games found</h3>
          <p>Be the first to add a {genre} game to the library!</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {games.map((game, index) => (
            <div
              key={game.id || index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                backgroundColor: "#f9f9f9",
                display: "flex",
                flexDirection: "column",
                minHeight: "350px",
              }}
            >
              {game.url && (
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    overflow: "hidden",
                    borderRadius: "4px",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={game.url}
                    alt={game.alt || game.gametitle}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `
                        <div style="
                          width: 100%; 
                          height: 100%; 
                          display: flex; 
                          align-items: center; 
                          justify-content: center; 
                          color: #666;
                          font-size: 0.9rem;
                        ">
                          Image not available
                        </div>
                      `;
                    }}
                  />
                </div>
              )}
              <h4
                style={{
                  margin: "0.75rem 0 0.5rem 0",
                  color: "#2c3e50",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  lineHeight: "1.3",
                }}
              >
                {game.gametitle || game.title || "Unknown Title"}
              </h4>
              {game.series && (
                <p
                  style={{
                    margin: "0.4rem 0",
                    fontSize: "0.95rem",
                    lineHeight: "1.4",
                  }}
                >
                  <strong
                    style={{
                      color: "#34495e",
                      fontWeight: "600",
                    }}
                  >
                    Series:
                  </strong>{" "}
                  <span style={{ color: "#555" }}>{game.series}</span>
                </p>
              )}
              {game.studio && (
                <p
                  style={{
                    margin: "0.4rem 0",
                    fontSize: "0.95rem",
                    lineHeight: "1.4",
                  }}
                >
                  <strong
                    style={{
                      color: "#34495e",
                      fontWeight: "600",
                    }}
                  >
                    Studio:
                  </strong>{" "}
                  <span style={{ color: "#555" }}>{game.studio}</span>
                </p>
              )}
              {game.gamedescription && (
                <p
                  style={{
                    margin: "0.75rem 0 1rem 0",
                    fontSize: "0.9rem",
                    color: "#555",
                    lineHeight: "1.5",
                    textAlign: "justify",
                    paddingTop: "0.5rem",
                    borderTop: "1px solid #eee",
                  }}
                >
                  {game.gamedescription}
                </p>
              )}
              <button
                onClick={() => deleteGame(game.id)}
                style={{
                  marginTop: "auto",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#c82333";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#dc3545";
                }}
              >
                Delete Game
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenrePage;

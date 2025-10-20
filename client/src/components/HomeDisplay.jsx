import React, { useState, useEffect } from "react";

const HomeDisplay = () => {
  const [games, setGames] = useState([]);
  const [collapsedSeries, setCollapsedSeries] = useState({});

  // Toggle collapse state for a series
  const toggleSeriesCollapse = (seriesName) => {
    setCollapsedSeries((prev) => ({
      ...prev,
      [seriesName]: !prev[seriesName],
    }));
  };

  // useEffect to set up interval for periodic fetching
  useEffect(() => {
    // Async function to fetch all games (defined inside useEffect to avoid dependency issues)
    const fetchAllGames = async () => {
      try {
        const response = await fetch(
          "https://week7-assigment.onrender.com/games"
        );
        const data = await response.json();
        // Update games state - React will only re-render if data actually changed
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    // Fetch games immediately when component mounts
    fetchAllGames();

    // Set up interval to fetch games every 5 seconds (5000ms)
    const interval = setInterval(() => {
      fetchAllGames();
    }, 5000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []); // No dependencies needed since fetchAllGames is defined inside

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

  // Group games by series
  const groupGamesBySeries = () => {
    const grouped = {};

    games.forEach((game) => {
      // Normalize series name: trim whitespace, handle null/undefined, and standardize case
      let series = game.series;
      if (!series || series.trim() === "") {
        series = "Standalone Games";
      } else {
        // Comprehensive normalization
        series = series.trim();

        // Remove all extra whitespace (including tabs, newlines)
        series = series.replace(/\s+/g, " ");

        // Normalize all types of apostrophes and quotes
        series = series.replace(/[''`´ʻʼ]/g, "'"); // All apostrophe variants
        series = series.replace(/[""„"]/g, '"'); // All quote variants

        // Normalize other punctuation
        series = series.replace(/[–—]/g, "-"); // Em/en dashes to hyphens

        // Remove leading/trailing punctuation that might cause issues
        series = series.replace(/^[^\w]+|[^\w]+$/g, "");

        // Convert to consistent case (Title Case)
        series = series.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );

        // Final cleanup - ensure no empty result
        if (!series.trim()) {
          series = "Standalone Games";
        }
      }

      if (!grouped[series]) {
        grouped[series] = [];
      }
      grouped[series].push(game);

      // Debug logging to see normalization in action
      if (game.series !== series) {
        console.log(`Normalized "${game.series}" → "${series}"`);
      }
    });

    return grouped;
  };

  const gamesBySeries = groupGamesBySeries();
  const seriesNames = Object.keys(gamesBySeries).sort();

  // Debug: Log series information
  console.log("Games by series:", gamesBySeries);
  console.log("All series names:", seriesNames);

  return (
    <div>
      <style>
        {`
          @keyframes fadeIn {
            from { 
              opacity: 0; 
              transform: translateY(-10px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          .series-content {
            animation: fadeIn 0.3s ease-in-out;
          }
        `}
      </style>
      <h2>All Games</h2>

      {seriesNames.map((seriesName) => (
        <div key={seriesName} style={{ marginBottom: "3rem" }}>
          <h3
            onClick={() => toggleSeriesCollapse(seriesName)}
            style={{
              borderBottom: "2px solid #007bff",
              paddingBottom: "0.5rem",
              color: "#007bff",
              fontSize: "1.5rem",
              cursor: "pointer",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.color = "#0056b3";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "#007bff";
            }}
          >
            <span>{seriesName}</span>
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                transform: collapsedSeries[seriesName]
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            >
              ▼
            </span>
          </h3>

          {!collapsedSeries[seriesName] && (
            <div
              className="series-content"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
                gap: "1.5rem",
                marginTop: "1rem",
              }}
            >
              {gamesBySeries[seriesName].map((game, index) => (
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
                    {game.gametitle || "Unknown Title"}
                  </h4>
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
                  {game.genre && (
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
                        Genre:
                      </strong>{" "}
                      <span
                        style={{
                          color: "#007bff",
                          fontWeight: "500",
                        }}
                      >
                        {game.genre}
                      </span>
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
      ))}

      {games.length === 0 && (
        <p style={{ textAlign: "center", color: "#666", fontSize: "1.1rem" }}>
          No games found. Add some games to get started!
        </p>
      )}
    </div>
  );
};

export default HomeDisplay;

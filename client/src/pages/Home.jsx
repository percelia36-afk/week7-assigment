import React, { useState } from "react";
import HomeDisplay from "../components/HomeDisplay";
import Form from "../components/Form";

const Home = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <main>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>Welcome to the Game Library</h1>
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

      <HomeDisplay />
    </main>
  );
};

export default Home;

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "1.5rem",
        padding: "1.5rem 2rem",
        background: "#222",
        color: "#fff",
        flexWrap: "wrap",
        fontSize: "1.1rem",
        minHeight: "60px",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        style={{
          color: "#fff",
          textDecoration: "none",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
      >
        Home
      </Link>
      <Link
        to="/jrpgs"
        style={{
          color: "#fff",
          textDecoration: "none",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
      >
        JRPGs
      </Link>
      <Link
        to="/rpg"
        style={{
          color: "#fff",
          textDecoration: "none",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
      >
        RPG
      </Link>
      <Link
        to="/action-adventure"
        style={{ color: "#fff", textDecoration: "none" }}
      >
        Action-Adventure
      </Link>
      <Link to="/action" style={{ color: "#fff", textDecoration: "none" }}>
        Action
      </Link>
      <Link to="/adventure" style={{ color: "#fff", textDecoration: "none" }}>
        Adventure
      </Link>
      <Link to="/strategy" style={{ color: "#fff", textDecoration: "none" }}>
        Strategy
      </Link>
      <Link to="/simulation" style={{ color: "#fff", textDecoration: "none" }}>
        Simulation
      </Link>
      <Link to="/sports" style={{ color: "#fff", textDecoration: "none" }}>
        Sports
      </Link>
      <Link to="/racing" style={{ color: "#fff", textDecoration: "none" }}>
        Racing
      </Link>
      <Link to="/fighting" style={{ color: "#fff", textDecoration: "none" }}>
        Fighting
      </Link>
      <Link to="/platformer" style={{ color: "#fff", textDecoration: "none" }}>
        Platformer
      </Link>
      <Link to="/puzzle" style={{ color: "#fff", textDecoration: "none" }}>
        Puzzle
      </Link>
      <Link to="/horror" style={{ color: "#fff", textDecoration: "none" }}>
        Horror
      </Link>
      <Link to="/shooter" style={{ color: "#fff", textDecoration: "none" }}>
        Shooter
      </Link>
    </nav>
  );
}

export default Navbar;

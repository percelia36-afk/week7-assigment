import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./NavBar";
import GenrePage from "./components/GenrePage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jrpgs" element={<GenrePage genre="JRPG" />} />
            <Route path="/rpg" element={<GenrePage genre="RPG" />} />
            <Route
              path="/action-adventure"
              element={<GenrePage genre="Action-Adventure" />}
            />
            <Route path="/action" element={<GenrePage genre="Action" />} />
            <Route
              path="/adventure"
              element={<GenrePage genre="Adventure" />}
            />
            <Route path="/strategy" element={<GenrePage genre="Strategy" />} />
            <Route
              path="/simulation"
              element={<GenrePage genre="Simulation" />}
            />
            <Route path="/sports" element={<GenrePage genre="Sports" />} />
            <Route path="/racing" element={<GenrePage genre="Racing" />} />
            <Route path="/fighting" element={<GenrePage genre="Fighting" />} />
            <Route
              path="/platformer"
              element={<GenrePage genre="Platformer" />}
            />
            <Route path="/puzzle" element={<GenrePage genre="Puzzle" />} />
            <Route path="/horror" element={<GenrePage genre="Horror" />} />
            <Route path="/shooter" element={<GenrePage genre="Shooter" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

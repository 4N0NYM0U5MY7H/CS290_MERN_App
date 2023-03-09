import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import CreateExercisePage from "./pages/CreateExercise";
import EditExercisePage from "./pages/EditExercise";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <img src={logo} className="App-logo" alt="logo" width="100px" />
          Exercise Tracker
        </h1>
        <p>
          Full Stack MERN App Demonstration
        </p>
      </header>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/add-exercise" element={<CreateExercisePage />}></Route>
          <Route path="/edit-exercise" element={<EditExercisePage />}></Route>
        </Routes>
      </Router>
      <footer>
        <p>&copy; 2023 August Frisk.</p>
      </footer>
    </div>
  );
}

export default App;

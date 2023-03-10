import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import HomePage from "./pages/HomePage";
import AddExercisePage from "./pages/AddExercisePage";
import EditExercisePage from "./pages/EditExercise";

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <AppHeader />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}></Route>
          <Route path="/add-exercise" element={<AddExercisePage />}></Route>
          <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route>
        </Routes>
      </Router>
      <AppFooter />
    </div>
  );
}

export default App;

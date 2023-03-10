import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="App-nav">
            <Link to="/">Home</Link>
            <Link to="/add-exercise">Add</Link>
        </nav>
    );
};
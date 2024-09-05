import React from "react";
import ReactDOM from "react-dom/client";
import "../../css/app.css";
import Calendar from "./Calendar/Calendar";

function App() {
    return (
        <div className="App">
            <Calendar />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);

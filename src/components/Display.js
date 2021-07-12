import React from "react";
import "../App.css";

function Display( {output} ) {
    let display = output;
    if(!output) {
        display = 0;
    }
    return (
        <div className="display">{display}</div>
    )
}

export default Display;
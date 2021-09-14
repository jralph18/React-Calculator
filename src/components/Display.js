import React from "react";
import "../App.css";

/*
    Display component to render calculator display.
    @props: 
        output - value to be rendered to the display
*/
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
import React from 'react';
import "../App.css";

/*
    Display component to render clear button (special case).
    @props: 
        clear - function to clear state values passed from App.js
*/
function Clear({clear}) {
    return (
        <div className="btn top" id="clear" onClick={clear}>
            <p>C</p>
        </div>
    )
}

export default Clear;
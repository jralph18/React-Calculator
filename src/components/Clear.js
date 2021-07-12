import React from 'react';
import "../App.css";

function Clear({clear}) {
    return (
        <div className="btn top" id="clear" onClick={clear}>
            <p>C</p>
        </div>
    )
}

export default Clear;
import React from 'react';
import "/Users/Jake/Desktop/JavaWork/javascript/React/calculator/src/App.css";

function Button( {alignment="none", value, updateVal} ) {
    return (
        <div className={`btn num-btn ${alignment}`} onClick={(e) => updateVal(e.target.textContent)}>
            <p>{value}</p>
        </div>
    )
}
export default Button;
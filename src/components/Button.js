import React from 'react';
import "/Users/Jake/Desktop/JavaWork/javascript/React/calculator/src/App.css";

/*
    Button component to render all calculator buttons other than the clear button.
    @props: 
        alignment - to specify class for css purposes; takes value none (default), top, or right;
        value - the button text to be displayed;
        updateVal - the function used to handle the button click;
*/
function Button( {alignment="none", value, updateVal} ) {
    return (
        <div className={`btn num-btn ${alignment}`} onClick={(e) => updateVal(e.target.textContent)}>
            <p>{value}</p>
        </div>
    )
}
export default Button;
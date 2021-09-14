import './App.css';
import Button from './components/Button';
import Display from './components/Display';
import Clear from './components/Clear';
import { useState } from 'react';

function App() {
  /*
    Application state:
      displayVal - string rendered to calculator display
      storedVal - string representation of first number in expression to be evaluated
      operator - operator clicked after first value is entered
      reset - change behavior after equals button is clicked
  */
  const [displayVal, setDisplayVal] = useState("");
  const [storedVal, setStoredVal] = useState("");
  const [operator, setOperator] = useState("");
  const [reset, setReset] = useState(false);

  // Object to convert operator value from unicode representation to JavaScript operator
  const operations = {"\u00f7": "/", "\u00d7": "*", "\u2212": "-", "\u002b": "+"};

  /**
   * Helper function to evaluate calculator expression without use of JavaScript built-in "eval"
   * @param val1 first operand for arithmetic expression
   * @param val2 second operand for arithmetic expression
   * @param operator operator that takes value +, -, *, or /
   * @return result of arithmetic expression "val1 operator val2"
   */
  const evaluate = (val1, val2, operator) => {
    val1 = Number(val1);
    val2 = Number(val2);
    try {
      switch (operator) {
        case "+":
          return String(val1 + val2);
        case "-":
          return String(val1 - val2);
        case "*":
          return String(val1 * val2);
        case "/":
          return String(val1 / val2);
        default:
          return "ERROR";
      }
    } catch(e) {
      console.log(e);
      return "ERROR";
    }
  }

  /**
   * Updates calculator display when a button is clicked by the user.
   * 
   * @param clicked calculator button clicked by user (e.target.textContent)
   */
  const updateDisplay = async (clicked) => {
    // Handle "." (special case)
    if (clicked === ".") {
      // Ignore if already clicked. If display has no "ones" value, set display to "0."
      if (displayVal.includes(".")) {
        return;
      } else if (reset) {
        setDisplayVal("0.");
        setStoredVal("");
        setReset(false);
        return;
      } else if (!displayVal || displayVal === "0" || operator) {
        setStoredVal(displayVal);
        setDisplayVal("0.");
        return;
      }
    }
    // Default: append value of clicked button to the display (else statement)
    // Special cases: if operator was last clicked, set storedVal to current displayVal + reset displayVal w new value
    //                if equals was last clicked, overwrite displayVal with new value
    if (operator && !storedVal) {
      setStoredVal(displayVal);
      setDisplayVal(clicked);
    } else if (reset) {
      setDisplayVal(clicked);
      setReset(false);
    } else {
      setDisplayVal(displayVal + clicked);
    }
  }
 
  /**
   * Updates calculator display when a clear button is clicked by the user.
   * Resets all state values to initial state.
   */
  const clear = async () => {
    setDisplayVal("");
    setStoredVal("");
    setOperator("");
    setReset(false);
  }

  /**
   * Handles clicks of special characters % and +/-. When % is clicked, change display to a percentage
   * 
   * @param clicked calculator button clicked by user (e.target.textContent)
   */
  const special = async (clicked) => {
    setReset(false);
    switch(clicked) {
      case "%":
        if(!operator) { // if no operator stored
          setDisplayVal(displayVal * 0.01);
        } else if (!storedVal) {
          setDisplayVal(displayVal * displayVal * 0.01)
        } else {
          setDisplayVal(evaluate(storedVal, displayVal * 0.01, operator))
        }
        break;
      case "+/-":
        setDisplayVal(eval(-1 * displayVal));
        break;
      default:
        return;
    }
  }

  /**
   * Handles clicks of operator buttons: +, -, /, *.
   * 
   * @param clicked calculator button clicked by user (e.target.textContent)
   */
  const operation = async (clicked) => {
    if (!displayVal) {
      return;
    }
    setReset(false);
    // if no stored value, set operator and return else evaluate expression
    if (!storedVal) {
      setOperator(operations[clicked]);
      return;
    } else {
      setDisplayVal(evaluate(storedVal, displayVal, operator));
      setStoredVal("");
      setOperator(operations[clicked])
    }
  }

  /**
   * Handles clicks of equals button.
   */
  const equals = async () => {
    // If user has not input number or operator values, ignore click
    if(!displayVal || !operator) {
      return;
    }
    // change operand based on input; if no second value perform clicked operation on self
    let operand = storedVal ? storedVal : displayVal;
    setDisplayVal(evaluate(operand, displayVal, operator));
    setStoredVal("");
    setOperator("");
    setReset(true);
  }

  return (
    <div className="app">
      <div className="calculator">
        <div className="row">
          <Display output={displayVal}/>
        </div>
        <div className="row">
          <Clear clear={clear}/>
          <Button alignment="top" value="+/-" updateVal={special}/>
          <Button alignment="top" value="%" updateVal={special}/>
          <Button alignment="right" value={'\u00f7'} updateVal={operation}/>
        </div>
        <div className="row">
          <Button alignment="none" value="7" updateVal={updateDisplay}/>
          <Button value="8" updateVal={updateDisplay}/>
          <Button value="9" updateVal={updateDisplay}/>
          <Button alignment="right" value={'\u00d7'} updateVal={operation}/>
        </div>
        <div className="row">
          <Button value="4" updateVal={updateDisplay}/>
          <Button value="5" updateVal={updateDisplay}/>
          <Button value="6" updateVal={updateDisplay}/>
          <Button alignment="right" value={'\u2212'} updateVal={operation}/>
        </div>
        <div className="row">
          <Button value="1" updateVal={updateDisplay}/>
          <Button value="2" updateVal={updateDisplay}/>
          <Button value="3" updateVal={updateDisplay}/>
          <Button alignment="right" value={'\u002b'} updateVal={operation}/>
        </div>
        <div className="row">
          <Button alignment="zero" value="0" updateVal={updateDisplay}/>
          <Button value="." updateVal={updateDisplay}/>
          <Button alignment="right" value={'='} updateVal={equals}/>
        </div>
      </div>
    </div>
  );
}

export default App;
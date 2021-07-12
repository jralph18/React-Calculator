import './App.css';
import Button from './components/Button';
import Display from './components/Display';
import Clear from './components/Clear';
import { useState } from 'react';

function App() {
  const [displayVal, setDisplayVal] = useState("");
  const [storedVal, setStoredVal] = useState("");
  const [operator, setOperator] = useState("");
  const [reset, setReset] = useState(false);

  const operations = {"\u00f7": "/", "\u00d7": "*", "\u2212": "-", "\u002b": "+"};

  const evaluate = (val1, val2, operator) => {
    val1 = Number(val1);
    val2 = Number(val2);
    try {
    switch(operator) {
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

  const updateDisplay = async (clicked) => {
    if (clicked === ".") {
      if (displayVal.includes(".")) {
        return;
      } else if (!displayVal || displayVal === "0" || operator){
        setStoredVal(displayVal);
        setDisplayVal("0.");
        return;
      }
    }
    if(operator && !storedVal) {
      setStoredVal(displayVal);
      setDisplayVal(clicked);
    } else if (reset) {
      setDisplayVal(clicked);
      setReset(false);
    } else {
      setDisplayVal(displayVal + clicked);
    }
  }
 
  const clear = async () => {
    setDisplayVal("");
    setStoredVal("");
    setOperator("");
    setReset(false);
  }

  const special = async (clicked) => {
    if(!displayVal && clicked !== ".") return;
    setReset(false);
    switch(clicked) {
      case "%":
        if(!operator) {
          setDisplayVal(displayVal * 0.01);
        } else if (!storedVal) {
          setDisplayVal(displayVal * displayVal * 0.01)
        } else {
          setDisplayVal(evaluate(storedVal, displayVal*0.01, operator))
        }
        break;
      case "+/-":
        setDisplayVal(eval(-1 * displayVal));
        break;
      default:
        return;
    }
  }

  const operation = async (clicked) => {
    if(!displayVal) return;
    setReset(false);
    if(!storedVal) {
      setOperator(operations[clicked]);
      return;
    } else {
      setDisplayVal(evaluate(storedVal, displayVal, operator));
      setStoredVal("");
      setOperator(operations[clicked])
    }
  }

  const equals = async () => {
    if(!displayVal || !operator) return;
    
    const operand = storedVal ? storedVal : displayVal;
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
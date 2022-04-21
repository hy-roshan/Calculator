import React, { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [def, setDef] = useState(0);
  const [previous, setPrevious] = useState("");
  const [current, setCurrent] = useState("");
  const [operation, setOperation] = useState("");
  const [toggle, setToggle] = useState(false); //button toggle for scientific
  const [theme, setTheme] = useState(""); //light/dark theme

  const appendValue = (el) => {
    const value = el.target.getAttribute("data");
    setDef(value);

    if (current === "0" && value === "0") return;
    else if (current.toString().startsWith("0")) {
      setCurrent(value);
      return;
    }
    setCurrent(current + value);
  };

  const handleAllClear = () => {
    setDef(0);
    setCurrent("");
    setPrevious("");
    setOperation("");
  };

  const chooseOperation = (el) => {
    if (current === "") return;
    if (previous !== "") {
      let value = compute();
      setPrevious(value);
    } else {
      setPrevious(current);
    }

    setCurrent("");
    setOperation(el.target.getAttribute("data"));
  };

  const equals = () => {
    let value = compute();
    if (value == undefined || value == null) return;

    setCurrent(value);
    setPrevious("");
    setOperation("");
  };

  const compute = () => {
    let result;
    let previousNumber = parseFloat(previous); //converts string to float for performing operations
    let currentNumber = parseFloat(current);

    if (isNaN(previousNumber) || isNaN(currentNumber)) return;

    switch (operation) {
      case "Div(/)":
        if (previousNumber === 0 || currentNumber === 0) {
          alert("cant divide with 0");
          handleAllClear();
          break;
        }
        result = previousNumber / currentNumber;
        break;
      case "Mul(*)":
        result = previousNumber * currentNumber;
        break;
      case "Add(+)":
        result = previousNumber + currentNumber;
        break;
      case "Sub(-)":
        result = previousNumber - currentNumber;
        break;
      default:
        return;
    }

    return result;
  };
  const scientificHandler = (el) => {
    const val = el.target.getAttribute("data");

    switch (val) {
      case "Square root":
        if (current < 0) {
          alert("Please provide a positive integer");
          handleAllClear();
          break;
        }
        setCurrent(Math.sqrt(current));
        break;
      case "Square":
        setCurrent(current * current);
        break;
      case "Sign":
        setCurrent(current * -1);
        break;
      default:
        return;
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="display">
          <div className="input">
            {def === 0 ? def : current === "" ? previous : current}
          </div>
        </div>
        <div className={`keypad ${theme}`}>
          <button className="btn" data={"1"} onClick={appendValue}>
            1
          </button>
          <button className="btn" data={"2"} onClick={appendValue}>
            2
          </button>
          <button className="btn" data={"3"} onClick={appendValue}>
            3
          </button>
          <button className="btn" data={"Add(+)"} onClick={chooseOperation}>
            Add(+)
          </button>
          <button className="btn" data={"4"} onClick={appendValue}>
            4
          </button>
          <button className="btn" data={"5"} onClick={appendValue}>
            5
          </button>
          <button className="btn" data={"6"} onClick={appendValue}>
            6
          </button>
          <button className="btn" data={"Sub(-)"} onClick={chooseOperation}>
            Sub(-)
          </button>
          <button className="btn" data={"7"} onClick={appendValue}>
            7
          </button>
          <button className="btn" data={"8"} onClick={appendValue}>
            8
          </button>
          <button className="btn" data={"9"} onClick={appendValue}>
            9
          </button>
          <button className="btn" data={"Mul(*)"} onClick={chooseOperation}>
            Mul(*)
          </button>
          <button className="btn" onClick={handleAllClear}>
            Clear
          </button>
          <button id="zero" className="btn" data={"0"} onClick={appendValue}>
            0
          </button>
          <button className="btn" onClick={equals}>
            =
          </button>
          <button className="btn" data={"Div(/)"} onClick={chooseOperation}>
            Div(/)
          </button>
          <button className="btn" onClick={() => setToggle(!toggle)}>
            Scientific
          </button>
          {toggle ? (
            <>
              <button
                className="btn"
                data="Square root"
                onClick={scientificHandler}
              >
                Square root
              </button>
              <button className="btn" data="Square" onClick={scientificHandler}>
                Square
              </button>
              <button className="btn" data="Sign" onClick={scientificHandler}>
                Sign
              </button>
            </>
          ) : null}
          <button
            className="btn"
            onClick={() => {
              setTheme("light");
              document.body.style.backgroundColor = "#fff";
            }}
          >
            Light
          </button>
          <button
            className="btn"
            onClick={() => {
              setTheme("dark");
              document.body.style.backgroundColor = "#000";
            }}
          >
            Dark
          </button>
        </div>
      </div>
    </div>
  );
}

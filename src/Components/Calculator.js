import React, { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [d, sd] = useState(0);
  const [previous, setPrevious] = useState("");
  const [current, setCurrent] = useState("");
  const [operation, setOperation] = useState("");
  const [toggle, setToggle] = useState(false);
  const [theme, setTheme] = useState("");
  const appendValue = (el) => {
    sd(d + 1);
    const value = el.target.getAttribute("data");

    setCurrent(current + value);
  };

  const handleAllClear = () => {
    sd(0);
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
    if (value === undefined || value === null) return;

    setCurrent(value);
    setPrevious("");
    setOperation("");
  };

  const compute = () => {
    let result;
    let previousNumber = parseFloat(previous);
    let currentNumber = parseFloat(current);

    if (isNaN(previousNumber) || isNaN(currentNumber)) return;

    switch (operation) {
      case "Div(/)":
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
  const scihandler = (el) => {
    const val = el.target.getAttribute("data");
    val === "Square root"
      ? setCurrent(Math.sqrt(current))
      : val === "Square"
      ? setCurrent(current * current)
      : setCurrent(current * -1);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="display">
          <input value={d === 0 ? d : current === "" ? previous : current} />
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
          <button className="btn" data={"0"} onClick={appendValue}>
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
              <button className="btn" data="Square root" onClick={scihandler}>
                Square root
              </button>
              <button className="btn" data="Square" onClick={scihandler}>
                Square
              </button>
              <button className="btn" data="Sign" onClick={scihandler}>
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
          <button className="btn" onClick={() => setTheme("")}>
            Default
          </button>
        </div>
      </div>
    </div>
  );
}

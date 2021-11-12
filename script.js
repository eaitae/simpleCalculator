let runningTotal=0;
let buffer="0";
let buffer2="0";
let previousOperator;
const screen = document.querySelector(".screen");


function buttonClick(value) {
    if(isNaN(parseFloat(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

 function handleNumber(value) {
    if(buffer === "0") {
        buffer = value;
        if(buffer2 === "0")
        buffer2 = value;
        else 
        buffer2 += value
    } else {
        buffer +=value;
        buffer2 += value;
    }
 }

 function handleMath(value) {
     if(buffer === "0") {
         return;
     }

     const floatBuffer = parseFloat(buffer);
     if(runningTotal === 0){
         runningTotal = floatBuffer;
         console.log("funfou");
     } else {
         flushOperation(floatBuffer);
    }
    previousOperator = value;
    buffer2 += previousOperator;
     buffer = "0";
}

function flushOperation(floatBuffer) {
    if (previousOperator === "+") {
      runningTotal += floatBuffer;
    } else if (previousOperator === "-") {
      runningTotal -= floatBuffer;
    } else if (previousOperator === "x") {
      runningTotal *= floatBuffer;
    } else {
      runningTotal /= floatBuffer;
    }
  }
 
  function handleSymbol(value) {
    switch (value) {
      case "C":
        buffer = "0";
        buffer2 = "0";
        runningTotal = 0;
        break;
      case "=":
        if (previousOperator === null) {
          return;
        }
        flushOperation(parseFloat(buffer));
        previousOperator = null;
        buffer = +runningTotal;
        buffer2 = buffer; 
        runningTotal = 0;
        break;
      case "˂":
        if (buffer.length === 1) {
          buffer = "0";
          buffer2 = "0";
        } else {
          buffer = buffer.substring(0, buffer.length - 1);
          buffer2 = buffer2.substring(0, buffer2.length - 1);
        }
        break;
      case "+":
      case "-":
      case "x":
      case "÷":
        handleMath(value);
        break;
      case ",":
        handleComma(value);
    }
  }

function handleComma(value) {
    if(value === ",") 
       buffer += ".";
       buffer2 += ".";
}

 function rerender() {
     screen.innerText = buffer2;
 }

 function init() {
    let e = document.querySelectorAll(".calcButton");
    e.forEach(element => {
        element.addEventListener("click", function(event) {
            buttonClick(event.target.innerText);
        });
    });
 }

 init();
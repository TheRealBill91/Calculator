let displayOutputContainer = document.querySelector('.displayOutputContainer');
let inputDisplay = document.querySelector('.displayInputPara');
let displayResult = document.querySelector('.displayResultPara');
let numberPad = document.querySelectorAll('.numberPad');
let multiplyOperator = document.querySelector('.multiply');
let additionOperator = document.querySelector('.add');
let subtractionOperator = document.querySelector('.subtract');
let divisionOperator = document.querySelector('.divide');
let equalSign = document.querySelector('.equalSign');
let clearAllButton = document.querySelector('.clearAllButton');
let backspaceButton = document.querySelector('.deleteButton');
let displayOperator;
let mustBeNumber = false //variable used to make sure user cannot enter an operator twice
//Not being used, equalAfterEnter boolean doing the same thing.
let mustBeOperator = false //boolean prevents user from entering numbers after hitting equals 
let allowDecimalPerInput = true;
let displayHolder = [];
let calcMemory = [];
let noComma;
let firstTempArray;
let secondInputArray = [];
let waitSecondInput = false;
let operatorSign;
let firstInputNum;
let returnValue;
let equalAfterEnter = false;
let tempInputDisplayValue;
let holderValueTwo;


// //When a user operates on the first two numbers entered and hits equals, then
// //hits the single clear button. This boolean will alter the state of the last else
// // statement inside of the numInputFunction.  This is done in order to clear the original displayHolder, while making
// //it look like (in the display input div) the original display input (before hitting the single clear) is still there.
// let tempDisplayHoldClear = false;
// let tempDisplayClearArr = [];


numPadListen();
multiplyOperatorListen();
divisionOperatorListen();
additionOperatorListen();
subtractionOperatorListen();
equalOperatorListen();
clearAllButtonListen();
clearSingleValue();




//clears the entire calculator memory
function clearAllButtonListen() {
    clearAllButton.addEventListener('click', clearEverything);
}

function clearEverything() {
    displayHolder = [];
    calcMemory = [];
    noComma = undefined;
    firstTempArray = [];
    secondInputArray = [];
    waitSecondInput = false;
    firstInputNum = undefined;
    returnValue = undefined;
    operatorSign = undefined;
    inputDisplay.textContent = "";
    displayResult.textContent = "";
    equalAfterEnter = false;
    displayOperator = undefined;
    mustBeOperator = false;
    allowDecimalPerInput = true;
}


//clears the last thing inside of the display result (calcMemory)
function clearSingleValue() {
    backspaceButton.addEventListener('click', clearLastValue);
}

//clears the last value entered. If user has hit the equals button, it will completely reset the calculator
function clearLastValue() {
    if (waitSecondInput) {
        secondInputArray.pop();
        noComma = secondInputArray.join("");
        displayResult.textContent = noComma;
    } else if (calcMemory.length >= 1 && noComma) {
        secondInputArray.pop();
        noComma = secondInputArray.join("");
        displayResult.textContent = noComma;
    } else if (equalAfterEnter) {
        clearEverything();
    } else {
        displayHolder.pop();
        firstTempArray.pop();
        noComma = firstTempArray.join("");
        displayResult.textContent = noComma;
    }
}


function equalOperatorListen() {
    equalSign.addEventListener('click', equalOperation);
}

function equalOperation() {
    //prevents user from hitting enter button without first selecting a number after an operation has taken place
    if (calcMemory.length >= 1 && equalAfterEnter) {
        return;
        //prevents user from hitting enter button if they have only input one number total
        // look at first if statement in numInputHolder() to see why
    } else if (!operatorSign || noComma == "") {
        return;
        //When doing more than one operation (on two nums) BEFORE hitting enter, if a user trys to hit enter without entering the second number,
        //the equal button will return
    } else if (!mustBeNumber) {
        return;
    } else if (calcMemory.length >= 1 && noComma) {
        allowDecimalPerInput = true; //allow user to enter decimal again
        displayHolder.push(+noComma);
        calcMemory.push(+noComma);
        let displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        noComma = 0;
        returnValue = operate(calcMemory[1], calcMemory[0], calcMemory[2]);
        calcMemory = [];
        calcMemory.push(returnValue);
        inputDisplay.textContent = displayHolder.join("");
        displayResult.textContent = calcMemory.join("");
        equalAfterEnter = true;
    } else {
        let displayOperator = this.textContent;
        twoNumberOperation(displayOperator);
    }

}



function additionOperatorListen() {
    additionOperator.addEventListener('click', additionOperation)
}

function additionOperation() {
    if (!mustBeNumber) {
        return; //returns if user trys to enter subtract button twice without first entering a number
    } else if (displayHolder.length > 1 && waitSecondInput) {
        let displayOperator = this.textContent;
        operateFirstTwoNums(displayOperator);
        //adds operator to calcMemory array after user operates (hits enter) on two previous numbers
    } else if (equalAfterEnter) {
        let displayOperator = this.textContent;
        let tempCalcMemoryValue = calcMemory.join("");
        addOperatorAfterEquals(displayOperator, tempCalcMemoryValue);
    } //added the displayOperator = true so that the second input number (before any equals) never runs the below if statement 
    //If we did not have the displayOperator in the if, then this would run earlier than we want
    else if (displayHolder.length >= 4 && displayOperator) {
        let displayOperator = this.textContent;
        operateAndReturn(displayOperator);
    } else {
        let that = this;
        insertFirstOperator(that);

    }
}



function subtractionOperatorListen() {
    subtractionOperator.addEventListener('click', subtractionOperation)
}

function subtractionOperation() {
    if (!mustBeNumber) {
        return; //returns if user trys to enter subtract button twice without first entering a number
    } else if (displayHolder.length > 1 && waitSecondInput) {
        let displayOperator = this.textContent;
        operateFirstTwoNums(displayOperator);
        //adds operator to calcMemory array after user operates (hits enter) on two previous numbers
    } else if (equalAfterEnter) {
        let displayOperator = this.textContent;
        let tempCalcMemoryValue = calcMemory.join("");
        addOperatorAfterEquals(displayOperator, tempCalcMemoryValue);
    } //added the displayOperator = true so that the second input number (before any equals) never runs the below if statement 
    //If we did not have the displayOperator in the if, then this would run earlier than we want
    else if (displayHolder.length >= 4 && displayOperator) {
        let displayOperator = this.textContent;
        operateAndReturn(displayOperator);
    } else {
        let that = this;
        insertFirstOperator(that);

    }
}


function multiplyOperatorListen() {
    multiplyOperator.addEventListener('click', multiplyOperation);
}

function multiplyOperation() {
    if (!mustBeNumber) {
        return; //returns if user trys to enter subtract button twice without first entering a number
    } else if (displayHolder.length > 1 && waitSecondInput) {
        let displayOperator = this.textContent;
        operateFirstTwoNums(displayOperator);
        //adds operator to calcMemory array after user operates (hits enter) on two previous numbers
    } else if (equalAfterEnter) {
        let displayOperator = this.textContent;
        let tempCalcMemoryValue = calcMemory.join("");
        addOperatorAfterEquals(displayOperator, tempCalcMemoryValue);
    } //added the displayOperator = true so that the second input number (before any equals) never runs the below if statement 
    //If we did not have the displayOperator in the if, then this would run earlier than we want
    else if (displayHolder.length >= 4 && displayOperator) {
        let displayOperator = this.textContent;
        operateAndReturn(displayOperator);
    } else {
        let that = this;
        insertFirstOperator(that);

    }
}

function divisionOperatorListen() {
    divisionOperator.addEventListener('click', divisionOperation);
}

function divisionOperation() {
    if (!mustBeNumber) {
        return; //returns if user trys to enter subtract button twice without first entering a number
    } else if (displayHolder.length > 1 && waitSecondInput) {
        let displayOperator = this.textContent;
        operateFirstTwoNums(displayOperator);
        //adds operator to calcMemory array after user operates (hits enter) on two previous numbers
    } else if (equalAfterEnter) {
        let displayOperator = this.textContent;
        let tempCalcMemoryValue = calcMemory.join("");
        addOperatorAfterEquals(displayOperator, tempCalcMemoryValue);
    } //added the displayOperator = true so that the second input number (before any equals) never runs the below if statement 
    //If we did not have the displayOperator in the if, then this would run earlier than we want
    else if (displayHolder.length >= 4 && displayOperator) {
        let displayOperator = this.textContent;
        operateAndReturn(displayOperator);
    } else {
        let that = this;
        insertFirstOperator(that);

    }

}




function numPadListen() {
    numberPad.forEach(num => num.addEventListener('click', numInputHolder));

}

function numInputHolder(event) {
    if (mustBeOperator) {
        return;
    } else if (waitSecondInput) {
        let that = this;
        let secondInputValue = this.textContent;
        secondNumInput(that, secondInputValue);
    } else if (calcMemory.length >= 1 && equalAfterEnter) {
        mustBeNumber = true;
        //allows user to hit enter button again since they have selected a number
        equalAfterEnter = false;
        let value = this.textContent;
        if (value !== ".") {
            +value
        }
        if (value == ".") {
            if (!isDecimalAllowed(value)) {
                return;
            };
        }
        // displayHolder.push(value);
        // calcMemory.push(value);
        secondInputArray.push(value);
        noComma = secondInputArray.join("");
        inputDisplay.textContent = displayHolder.join("");
        displayResult.textContent = value;
    } else if (calcMemory.length >= 1) {
        let value = this.textContent;
        getSecondNonEqualNum(value);
    } else {
        let value = this.textContent;
        firstNumInput(value);
    }


}


//takes the first number input when a user clicks a number
function firstNumInput(value) {
    mustBeNumber = true;
    if (value !== ".") {
        +value
    }
    if (value == ".") {
        if (!isDecimalAllowed(value)) {
            return;
        };
    }
    const type = typeof noComma;
    // console.log(+this.textContent);
    // console.log(type);
    displayHolder.push(value);
    firstTempArray = [];
    firstTempArray = firstTempArray.concat(displayHolder);
    noComma = firstTempArray.join("");
    +noComma;
    console.log(`${noComma.toLocaleString("en-US")} + ${type}`);
    //inputDisplay.textContent = `${noComma.toLocaleString("en-US")}`;
    displayResult.textContent = `${noComma.toLocaleString("en-US")}`;
    console.log(`noComma var length: ${noComma.toString().length}`);
}

//adds the specific operator to the equation, part of the first operation (before any calcMemory or equals)
function insertFirstOperator(that) {
    allowDecimalPerInput = true; //allow user to enter decimal again
    mustBeNumber = false;
    waitSecondInput = true;
    console.log(`noComma var length: ${noComma.toString().length}`);
    displayHolder.unshift(+noComma);
    displayHolder.splice(1);
    //noComma = 0;
    displayOperator = that.textContent;
    displayHolder.push(displayOperator);
    const holderValue = displayHolder.join("");
    inputDisplay.textContent = holderValue.toLocaleString("en-US");
    displayResult.textContent = +noComma;
}


//takes the second number input when a user clicks a number button
function secondNumInput(that, secondInputValue) {
    mustBeNumber = true;
    //noComma = tempArray.join(" ");
    if (secondInputValue !== ".") {
        +secondInputValue
    }
    //first if checks if decimal even exists, second if checks if it is allowed
    if (secondInputValue == ".") {
        if (!isDecimalAllowed(secondInputValue)) {
            return;
        };
    }
    secondInputArray.push(secondInputValue);
    noComma = secondInputArray.join("");
    const type = typeof value;
    // console.log(+this.textContent);
    // console.log(type);
    //displayHolder.push(value);
    secondTempArray = [];
    secondTempArray = secondTempArray.concat(displayHolder);
    firstInputNum = secondTempArray[0];
    console.log(typeof (firstInputNum));
    operatorSign = secondTempArray[1];
    //let valueThree = tempArray[2];
    inputDisplay.textContent = firstInputNum + "" + operatorSign + "";
    displayResult.textContent = noComma;
    //noComma = `${valueOne} ${valueTwo} ${valueThree}`;
    // waitSecondInput = false;
}

//If operating on just two numbers and user hits enter, operate on the two numbers and return the result
function twoNumberOperation(displayOperator) {
    mustBeOperator = true;
    allowDecimalPerInput = true; //allow user to enter decimal again
    noComma = +noComma;
    displayHolder.push(noComma);
    displayHolder.push(displayOperator)
    equalAfterEnter = true;
    returnValue = operate(operatorSign, firstInputNum, noComma);
    //for displaying the current input values before the result is added to it
    tempInputDisplayValue = displayHolder.join("");
    displayHolder.push(returnValue);
    noComma = 0;
    calcMemory.push(returnValue);
    calcMemory.toLocaleString;
    waitSecondInput = false;
    displayResult.textContent = calcMemory.join("");
    inputDisplay.textContent = tempInputDisplayValue;
}


//If a user has two numbers and a certain operator symbol (e.g., "+") already in the displayHolder variable, 
//this function will add and return those two numbers.
function operateFirstTwoNums(displayOperator) {
    allowDecimalPerInput = true; //allow user to enter decimal again
    mustBeNumber = false;  //requires user to enter number after hitting one of the four operators
    displayHolder.push(+noComma);
    displayHolder.push(displayOperator);
    noComma = 0;
    waitSecondInput = false;
    returnValue = operate(displayHolder[1], displayHolder[0], displayHolder[2]);
    calcMemory.push(returnValue);
    calcMemory.push(displayOperator);
    holderValueTwo = displayHolder.join("");
    inputDisplay.textContent = holderValueTwo;
    displayResult.textContent = returnValue;
    secondInputArray = [];
}



//After the first two numbers have been operated on and returned, this will take the result of the
//previous two numbers and operate on it based on the last number entered
function operateAndReturn(displayOperator) {
    allowDecimalPerInput = true; //allow user to enter decimal again
    mustBeNumber = false;
    secondInputArray = [];
    if (noComma) {
        displayHolder.push(+noComma);
        calcMemory.push(+noComma);
    }
    displayHolder.push(displayOperator);
    noComma = 0;
    returnValue = operate(calcMemory[1], calcMemory[0], calcMemory[2]);
    calcMemory = [];
    calcMemory.push(returnValue);
    calcMemory.push(displayOperator);
    inputDisplay.textContent = displayHolder.join("");
    displayResult.textContent = returnValue;
}

//If a user has NOT hit the equals button, and they have hit the "+" button 2 >= times, this will
//get the second number to be added
function getSecondNonEqualNum(value) {
    mustBeNumber = true;
    if (value !== ".") {
        +value
    }
    if (value == ".") {
        if (!isDecimalAllowed(value)) {
            return;
        };
    }

    // displayHolder.push(value);
    // calcMemory.push(value);
    secondInputArray.push(value);
    noComma = secondInputArray.join("");
    inputDisplay.textContent = displayHolder.join("");
    displayResult.textContent = noComma;
}


//After a user operates on the two previous numbers and selects an operator, this function adds the operator
//to the calcMemory array
function addOperatorAfterEquals(displayOperator, tempCalcMemoryValue) {
    mustBeOperator = false;
    allowDecimalPerInput = true; //allow user to enter decimal again
    mustBeNumber = false;
    secondInputArray = [];
    displayHolder.push(displayOperator);
    calcMemory.push(displayOperator);
    noComma = 0;
    inputDisplay.textContent = displayHolder.join("");
    displayResult.textContent = tempCalcMemoryValue;
}

function isDecimalAllowed(val) {
    if (!allowDecimalPerInput) {
        return false;
    } else if (val == ".") {
        allowDecimalPerInput = false;
    }
    return true
}

function roundBigNums(sum) {
    let numAsString = sum.toString();
    let decimalIndex = numAsString.indexOf(".");
    //-1 means value not found, checking opposite of this here
    if (decimalIndex !== -1) {
        let splitStringNum = numAsString.split(".");
        if (splitStringNum[1].length > 4) {
            return sum.toFixed(4);
        } else {
            return +sum;
        }
    } else {
        return +sum;
    }
}

function add(...args) {
    if (typeof (args[0]) == "string" || typeof (args[1]) == "string") {
        return "Invalid result";
    }

    const sum = args.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
    }, 0);

    return roundBigNums(sum);
};

function subtract(...args) {
    if (typeof (args[0]) == "string" || typeof (args[1]) == "string") {
        return "Invalid result";
    }

    const sum = args.reduce((previousValue, currentValue) => {
        return previousValue - currentValue;
    })

    return roundBigNums(sum);
}

function multiply(...args) {
    if (typeof (args[0]) == "string" || typeof (args[1]) == "string") {
        return "Invalid result";
    }

    const sum = args.reduce((previousValue, currentValue) => {
        return previousValue * currentValue;
    })

    return roundBigNums(sum);
}

function divide(...args) {
    if (typeof (args[0]) == "string" || typeof (args[1]) == "string") {
        return "Invalid result";
    }

    const sum = args.reduce((previousValue, currentValue) => {
        return previousValue / currentValue;
    })

    if (isNaN(sum)) {
        return 'Error';
    } else if (!isFinite(sum)) {
        return 'Error'
    } else {
        return roundBigNums(sum);
    }

}

function operate(symbol, numOne, numTwo) {
    switch (symbol) {
        case "+":
            const addResult = add(numOne, numTwo);
            return addResult;
        case "-":
            const subtractResult = subtract(numOne, numTwo);
            return subtractResult;
        case "X":
            const multiplyResult = multiply(numOne, numTwo);
            return multiplyResult;
        case "/":
            const divideResult = divide(numOne, numTwo);
            return divideResult;
        default:
            return "Find and fix the error!";

    }

}




// console.log(operate("-", 2, 4));
let displayOutputContainer = document.querySelector('.displayOutputContainer');
let inputDisplay = document.querySelector('.displayInput');
let displayResult = document.querySelector('.displayResult');
let numberPad = document.querySelectorAll('.numberPad');
let multiplyOperator = document.querySelector('.multiply');
let additionOperator = document.querySelector('.add');
let subtractionOperator = document.querySelector('.subtract');
let divisionOperator = document.querySelector('.divide');
let equalSign = document.querySelector('.equalSign');
let clearButton = document.querySelector('.clearAllButton');
let displayOperator;
let mustBeNumber = false //variable used to make sure user cannot enter an operator twice
//Not being used, equalAfterEnter boolean doing the same thing.
let mustBeOperator = false //boolean prevents user from hitting enter button twice in a row 
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


numPadListen();
multiplyOperatorListen();
divisionOperatorListen();
additionOperatorListen();
subtractionOperatorListen();
equalOperatorListen();
clearButtonListen();





function clearButtonListen() {
    clearButton.addEventListener('click', clearEverything);
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
    operatorSign = undefined
    inputDisplay.textContent = "";
    displayResult.textContent = "";
    equalAfterEnter = false;
    displayOperator = undefined;
    mustBeOperator = false;
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
    } else if (!operatorSign) {
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
        allowDecimalPerInput = true; //allow user to enter decimal again
        noComma = +noComma;
        let displayOperator = this.textContent;
        displayHolder.push(noComma);
        displayHolder.push(displayOperator)
        equalAfterEnter = true;
        returnValue = operate(operatorSign, firstInputNum, noComma);
        let tempInputDisplayValue = displayHolder.join("");
        displayHolder.push(returnValue);
        noComma = 0;
        calcMemory.push(returnValue);
        calcMemory.toLocaleString;
        waitSecondInput = false;
        displayResult.textContent = calcMemory.join("");
        inputDisplay.textContent = tempInputDisplayValue;
    }

}

function additionOperatorListen() {
    additionOperator.addEventListener('click', additionOperation)
}

function additionOperation() {
    if (!mustBeNumber) {
        return; //returns if user trys to enter subtract button twice without first entering a number
    } else if (displayHolder.length > 1 && waitSecondInput) {
        allowDecimalPerInput = true; //allow user to enter decimal again
        mustBeNumber = false;  //requires user to enter number after hitting one of the four operators
        displayHolder.push(+noComma);
        let displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        noComma = 0;
        waitSecondInput = false;
        returnValue = operate(displayHolder[1], displayHolder[0], displayHolder[2]);
        calcMemory.push(returnValue);
        returnValue = 0;
        calcMemory.push(displayOperator);
        const holderValueTwo = displayHolder.join("");
        inputDisplay.textContent = holderValueTwo;
        secondInputArray = [];
        //adds operator to calcMemory array after user operates (hits enter) on two previous numbers
    } else if (equalAfterEnter) {
        allowDecimalPerInput = true; //allow user to enter decimal again
        mustBeNumber = false;
        secondInputArray = [];
        let displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        let tempCalcMemoryValue = calcMemory.join("");
        calcMemory.push(displayOperator);
        noComma = 0;
        inputDisplay.textContent = displayHolder.join("");
        displayResult.textContent = tempCalcMemoryValue;
    } //added the displayOperator = true so that 
    else if (displayHolder.length >= 4 && displayOperator) {
        allowDecimalPerInput = true; //allow user to enter decimal again
        mustBeNumber = false;
        secondInputArray = [];
        if (noComma) {
            displayHolder.push(+noComma);
            calcMemory.push(+noComma);
        }
        let displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        noComma = 0;
        returnValue = operate(calcMemory[1], calcMemory[0], calcMemory[2]);
        calcMemory = [];
        calcMemory.push(returnValue);
        calcMemory.push(displayOperator);
        inputDisplay.textContent = displayHolder.join("");
        displayResult.textContent = returnValue;
    } else {
        allowDecimalPerInput = true; //allow user to enter decimal again
        mustBeNumber = false;
        waitSecondInput = true;
        console.log(`noComma var length: ${noComma.toString().length}`);
        displayHolder.unshift(+noComma);
        displayHolder.splice(1);
        //noComma = 0;
        displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        const holderValue = displayHolder.join("");
        inputDisplay.textContent = holderValue.toLocaleString("en-US");
        displayResult.textContent = +noComma;
    }
}



function subtractionOperatorListen() {
    subtractionOperator.addEventListener('click', subtractionOperation)
}

function subtractionOperation() {
    if (!mustBeNumber) {
        return; //returns if user trys to enter subtract button twice without first entering a number
    } else if (displayHolder.length > 1 && waitSecondInput) {
        allowDecimalPerInput = true;
        mustBeNumber = false;  //requires user to enter number after hitting one of the four operators
        displayHolder.push(+noComma);
        let displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        noComma = 0;
        waitSecondInput = false;
        returnValue = operate(displayHolder[1], displayHolder[0], displayHolder[2]);
        calcMemory.push(returnValue);
        returnValue = 0;
        calcMemory.push(displayOperator);
        const holderValueTwo = displayHolder.join("");
        inputDisplay.textContent = holderValueTwo;
        secondInputArray = [];
        //adds operator to calcMemory array after user operates (hits enter) on two previous numbers
    } else if (equalAfterEnter) {
        allowDecimalPerInput = true;
        mustBeNumber = false;
        secondInputArray = [];
        let displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        let tempCalcMemoryValue = calcMemory.join("");
        calcMemory.push(displayOperator);
        noComma = 0;
        inputDisplay.textContent = displayHolder.join("");
        displayResult.textContent = tempCalcMemoryValue;
    } //added the displayOperator = true so that 
    else if (displayHolder.length >= 4 && displayOperator) {
        allowDecimalPerInput = true;
        mustBeNumber = false;
        secondInputArray = [];
        if (noComma) {
            displayHolder.push(+noComma);
            calcMemory.push(+noComma);
        }
        let displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        noComma = 0;
        returnValue = operate(calcMemory[1], calcMemory[0], calcMemory[2]);
        calcMemory = [];
        calcMemory.push(returnValue);
        calcMemory.push(displayOperator);
        inputDisplay.textContent = displayHolder.join("");
        displayResult.textContent = returnValue;
    } else {
        allowDecimalPerInput = true;
        mustBeNumber = false;
        waitSecondInput = true;
        console.log(`noComma var length: ${noComma.toString().length}`);
        displayHolder.unshift(+noComma);
        displayHolder.splice(1);
        //noComma = 0;
        displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        const holderValue = displayHolder.join("");
        inputDisplay.textContent = holderValue.toLocaleString("en-US");
        displayResult.textContent = +noComma;
    }
}


function multiplyOperatorListen() {
    multiplyOperator.addEventListener('click', multiplyOperation);
}

function multiplyOperation() {
    if (!mustBeNumber) {
        return; //returns if user trys to enter subtract button twice without first entering a number
    } else if (displayHolder.length > 1 && waitSecondInput) {
        allowDecimalPerInput = true;
        mustBeNumber = false;  //requires user to enter number after hitting one of the four operators
        displayHolder.push(+noComma);
        let displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        noComma = 0;
        waitSecondInput = false;
        returnValue = operate(displayHolder[1], displayHolder[0], displayHolder[2]);
        calcMemory.push(returnValue);
        returnValue = 0;
        calcMemory.push(displayOperator);
        const holderValueTwo = displayHolder.join("");
        inputDisplay.textContent = holderValueTwo;
        secondInputArray = [];
        //adds operator to calcMemory array after user operates (hits enter) on two previous numbers
    } else if (equalAfterEnter) {
        allowDecimalPerInput = true;
        mustBeNumber = false;
        secondInputArray = [];
        let displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        let tempCalcMemoryValue = calcMemory.join("");
        calcMemory.push(displayOperator);
        noComma = 0;
        inputDisplay.textContent = displayHolder.join("");
        displayResult.textContent = tempCalcMemoryValue;
    } //added the displayOperator = true so that 
    else if (displayHolder.length >= 4 && displayOperator) {
        allowDecimalPerInput = true;
        mustBeNumber = false;
        secondInputArray = [];
        if (noComma) {
            displayHolder.push(+noComma);
            calcMemory.push(+noComma);
        }
        let displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        noComma = 0;
        returnValue = operate(calcMemory[1], calcMemory[0], calcMemory[2]);
        calcMemory = [];
        calcMemory.push(returnValue);
        calcMemory.push(displayOperator);
        inputDisplay.textContent = displayHolder.join("");
        displayResult.textContent = returnValue;
    } else {
        allowDecimalPerInput = true;
        mustBeNumber = false;
        waitSecondInput = true;
        console.log(`noComma var length: ${noComma.toString().length}`);
        displayHolder.unshift(+noComma);
        displayHolder.splice(1);
        //noComma = 0;
        displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        const holderValue = displayHolder.join("");
        inputDisplay.textContent = holderValue.toLocaleString("en-US");
        displayResult.textContent = +noComma;
    }
}

function divisionOperatorListen() {
    divisionOperator.addEventListener('click', divisionOperation);
}

function divisionOperation() {
    if (!mustBeNumber) {
        return; //returns if user trys to enter subtract button twice without first entering a number
    } else if (displayHolder.length > 1 && waitSecondInput) {
        allowDecimalPerInput = true;
        mustBeNumber = false; //requires user to enter number after hitting one of the four operators
        displayHolder.push(+noComma);
        let displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        noComma = 0;
        waitSecondInput = false;
        returnValue = operate(displayHolder[1], displayHolder[0], displayHolder[2]);
        calcMemory.push(returnValue);
        returnValue = 0;
        calcMemory.push(displayOperator);
        const holderValueTwo = displayHolder.join("");
        inputDisplay.textContent = holderValueTwo;
        secondInputArray = [];
        //adds operator to calcMemory array after user operates (hits enter) on two previous numbers
    } else if (equalAfterEnter) {
        allowDecimalPerInput = true;
        mustBeNumber = false;
        secondInputArray = [];
        let displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        calcMemory.push(displayOperator);
        noComma = 0;
        inputDisplay.textContent = displayHolder.join("");
    } //added the displayOperator = true so that the second input number (before any equals) never runs the below if statement
    else if (displayHolder.length >= 4 && displayOperator) {
        allowDecimalPerInput = true;
        mustBeNumber = false;
        secondInputArray = [];
        if (noComma) {
            displayHolder.push(+noComma);
            calcMemory.push(+noComma);
        }
        let displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        noComma = 0;
        returnValue = operate(calcMemory[1], calcMemory[0], calcMemory[2]);
        calcMemory = [];
        calcMemory.push(returnValue);
        calcMemory.push(displayOperator);
        inputDisplay.textContent = displayHolder.join("");
    } else {
        allowDecimalPerInput = true;
        mustBeNumber = false;
        waitSecondInput = true;
        console.log(`noComma var length: ${noComma.toString().length}`);
        displayHolder.unshift(+noComma);
        displayHolder.splice(1);
        noComma = 0;
        displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        const holderValue = displayHolder.join("");
        inputDisplay.textContent = holderValue.toLocaleString("en-US");
    }

}




function numPadListen() {
    numberPad.forEach(num => num.addEventListener('click', numInputHolder));

}

function numInputHolder(event) {
    if (waitSecondInput) {
        mustBeNumber = true;
        //noComma = tempArray.join(" ");
        let secondInputValue = this.textContent;
        if (secondInputValue !== ".") {
            +secondInputValue
        }
        //first if checks if decimal even exists, second if checks if it is allowed
        if (secondInputValue == "."){
            if (!isDecimalAllowed(secondInputValueq)) {
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
    } else if (calcMemory.length >= 1 && equalAfterEnter) {
        mustBeNumber = true;
        //allows user to hit enter button again since they have selected a number
        equalAfterEnter = false;
        let value = +this.textContent;
        if (value !== ".") {
            +value
        }
        if (value == "."){
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
        mustBeNumber = true;
        let value = +this.textContent;
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
    } else {
        mustBeNumber = true;
        let value = this.textContent;
        if (value !== ".") {
            +value
        }
        if (!isDecimalAllowed(value)) {
            return;
        };
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



}



function isDecimalAllowed(val) {
    if (!allowDecimalPerInput) {
        return false;
    } else if (val == ".") {
        allowDecimalPerInput = false;
    }
    return true
}


function add(...args) {
    const sum = args.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
    }, 0);

    return sum;
};

function subtract(...args) {
    const sum = args.reduce((previousValue, currentValue) => {
        return previousValue - currentValue;
    })

    return sum;
}

function multiply(...args) {
    const sum = args.reduce((previousValue, currentValue) => {
        return previousValue * currentValue;
    })

    return sum;
}

function divide(...args) {
    const sum = args.reduce((previousValue, currentValue) => {
        return previousValue / currentValue;
    })

    if (isNaN(sum)) {
        return 'Error';
    } else {
        return sum;
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
            return "It was none of these!";

    }

}




// console.log(operate("-", 2, 4));
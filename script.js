let displayOutputContainer = document.querySelector('.displayOutputContainer');
let inputDisplay = document.querySelector('.displayInput');
let displayResult = document.querySelector('.displayResult');
let numberPad = document.querySelectorAll('.numberPad');
let multiplyOperator = document.querySelector('.multiply');
let additionOperator = document.querySelector('.add');
let subtractionOperator = document.querySelector('.subtract');
let divisionOperator = document.querySelector('.divide');
let equalSign = document.querySelector('.equalSign');
let clearButton = document.querySelector('.clearButton');
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
}


function equalOperatorListen() {
    equalSign.addEventListener('click', equalOperation);
}

function equalOperation() {
    if (calcMemory.length >= 1 && !calcMemory[1] && !calcMemory[2]) {
        return;
    } else if (calcMemory.length >= 1 && noComma) {
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
        noComma = +noComma;
        let displayOperator = this.textContent;
        displayHolder.push(noComma);
        displayHolder.push(displayOperator)
        equalAfterEnter = true;
        returnValue = operate(operatorSign, firstInputNum, noComma);
        noComma = 0;
        calcMemory.push(returnValue);
        waitSecondInput = false;
        displayResult.textContent = calcMemory.join("");
        inputDisplay.textContent = displayHolder.join("");
    }




}

function additionOperatorListen() {
    additionOperator.addEventListener('click', additionOperation)
}

function additionOperation() {
    if (displayHolder.length > 1 && waitSecondInput) {
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
    } else if (equalAfterEnter) {
        secondInputArray = [];
        let displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        calcMemory.push(displayOperator);
        noComma = 0;
        inputDisplay.textContent = displayHolder.join("");
    } else if (displayHolder.length >= 4) {
        secondInputArray = [];
        if (noComma){
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
        waitSecondInput = true;
        console.log(`noComma var length: ${noComma.toString().length}`);
        displayHolder.unshift(+noComma);
        displayHolder.splice(1);
        noComma = 0;
        let displayOperator = this.textContent;
        displayHolder.push(displayOperator);
        const holderValue = displayHolder.join("");
        inputDisplay.textContent = holderValue.toLocaleString("en-US");
    }
}



function subtractionOperatorListen() {
    subtractionOperator.addEventListener('click', subtractionOperation)
}

function subtractionOperation() {
    waitSecondInput = true;
    console.log(`noComma var length: ${noComma.toString().length}`);
    displayHolder.unshift(+noComma);
    displayHolder.splice(1);
    noComma = 0;
    let displayOperator = this.textContent;
    displayHolder.push(displayOperator);
    const holderValue = displayHolder.join("");
    inputDisplay.textContent = holderValue.toLocaleString("en-US");
}


function multiplyOperatorListen() {
    multiplyOperator.addEventListener('click', multiplyOperation);
}

function multiplyOperation() {
    waitSecondInput = true;
    console.log(`noComma var length: ${noComma.toString().length}`);
    displayHolder.unshift(+noComma);
    displayHolder.splice(1);
    noComma = 0;
    let displayOperator = this.textContent;
    displayHolder.push(displayOperator);
    const holderValue = displayHolder.join("");
    inputDisplay.textContent = holderValue.toLocaleString("en-US");

}

function divisionOperatorListen() {
    divisionOperator.addEventListener('click', divisionOperation);
}

function divisionOperation() {
    waitSecondInput = true;
    console.log(`noComma var length: ${noComma.toString().length}`);
    displayHolder.unshift(+noComma);
    displayHolder.splice(1);
    noComma = 0;
    let displayOperator = this.textContent;
    displayHolder.push(displayOperator);
    const holderValue = displayHolder.join("");
    inputDisplay.textContent = holderValue.toLocaleString("en-US");
}




function numPadListen() {
    numberPad.forEach(num => num.addEventListener('click', numInputHolder));

}

function numInputHolder(event) {
    if (waitSecondInput) {
        //noComma = tempArray.join(" ");
        let secondInputValue = +this.textContent;
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
        inputDisplay.textContent = firstInputNum + "" + operatorSign + "" + noComma;
        //noComma = `${valueOne} ${valueTwo} ${valueThree}`;
        // waitSecondInput = false;
    } else if (calcMemory.length >= 1 && equalAfterEnter){
        equalAfterEnter = false;
        let value = +this.textContent;
        // displayHolder.push(value);
        // calcMemory.push(value);
        secondInputArray.push(value);
        noComma = secondInputArray.join("");
        inputDisplay.textContent = displayHolder.join("") + noComma;
    } else if (calcMemory.length >= 1) {
        let value = +this.textContent;
        // displayHolder.push(value);
        // calcMemory.push(value);
        secondInputArray.push(value);
        noComma = secondInputArray.join("");
        inputDisplay.textContent = displayHolder.join("") + noComma;
    } else {
        let value = +this.textContent;
        const type = typeof value;
        // console.log(+this.textContent);
        // console.log(type);
        displayHolder.push(value);
        firstTempArray = [];
        firstTempArray = firstTempArray.concat(displayHolder);
        noComma = firstTempArray.join("");
        console.log(`${noComma.toLocaleString("en-US")} + ${type}`);
        inputDisplay.textContent = `${noComma.toLocaleString("en-US")}`;
        console.log(`noComma var length: ${noComma.toString().length}`);

    }



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
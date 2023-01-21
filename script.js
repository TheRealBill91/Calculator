let displayOutputContainer = document.querySelector('.displayOutputContainer');
let inputDisplay = document.querySelector('.displayInput');
let numberPad = document.querySelectorAll('.numberPad');
let multiplyOperator = document.querySelector('.multiply');
let equalSign = document.querySelector('.equalSign');
let displayResult = document.createElement('div');
displayResult.className = "displayResult";
let displayHolder = [];
let calcMemory = [];
let noComma;
let firstTempArray;
let secondInputArray = [];
let waitSecondInput = false;
let operatorSign;
let firstInputNum;
let returnValue;



function equalOperatorListen() {
    equalSign.addEventListener('click', equalOperation);
}

function equalOperation() {
    noComma = +noComma;
    returnValue = operate(operatorSign, firstInputNum, noComma);
    calcMemory.push(returnValue);
    waitSecondInput = false;
    inputDisplay.textContent = calcMemory.join("");
    inputDisplay.style.alignItems = "flex-start";
    displayOutputContainer.appendChild(displayResult);


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
    const holderValue = displayHolder.join(" ");
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
        inputDisplay.textContent = `${firstInputNum} ${operatorSign} ${noComma}`
        //noComma = `${valueOne} ${valueTwo} ${valueThree}`;
        // waitSecondInput = false;
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

numPadListen();
multiplyOperatorListen();
equalOperatorListen();




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
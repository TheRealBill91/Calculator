let display = document.querySelector('.displayOutput');
let numberPad = document.querySelectorAll('.numberPad');
let displayHolder = [];



function numPadListen() {
    numberPad.forEach(num => num.addEventListener('click', numInputHolder));
    
}

function numInputHolder(event){
    let value = +this.textContent;
    const type = typeof value;
    // console.log(+this.textContent);
    // console.log(type);
    displayHolder.push(value);
    let noComma = +displayHolder.join("");
    console.log(noComma.toLocaleString("en-US"));
    display.textContent = `${noComma.toLocaleString("en-US")}`;

}

numPadListen();




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
        case "*":
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
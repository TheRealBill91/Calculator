let display = document.querySelector('.displayOutput');
let numberPad = document.querySelectorAll('.numberPad');
let multiplyOperator = document.querySelector('.multiply');
let displayHolder = [];
let noComma;
let tempArray;
let waitSecondInput = false;



function multiplyOperatorListen(){
    multiplyOperator.addEventListener('click', multiplyOperation )
}

function multiplyOperation(){
    waitSecondInput = true;
    console.log(`noComma var length: ${noComma.toString().length}`);
    displayHolder.unshift(+noComma);
    displayHolder.splice(1);
    noComma = 0;
    let displayOperator = this.textContent;
    displayHolder.push(displayOperator);
    const holderValue = displayHolder.join(" ");
    display.textContent = holderValue.toLocaleString("en-US");
  
}




function numPadListen() {
    numberPad.forEach(num => num.addEventListener('click', numInputHolder));
    
}

function numInputHolder(event){
    let value = +this.textContent;
    const type = typeof value;
    // console.log(+this.textContent);
    // console.log(type);
    displayHolder.push(value);
    tempArray = [];
    tempArray = tempArray.concat(displayHolder);
    if (waitSecondInput){
        //noComma = tempArray.join(" ");
        let valueOne = tempArray[0];
        let valueTwo = tempArray[1];
        let valueThree = tempArray[2];
        noComma = `${valueOne} ${valueTwo} ${valueThree}`;
        // waitSecondInput = false;
    } else {
        noComma = tempArray.join("");
        
    }
    console.log(`${noComma.toLocaleString("en-US")} + ${type}`);
    display.textContent = `${noComma.toLocaleString("en-US")}`;
    console.log(`noComma var length: ${noComma.toString().length}`);
    

}

numPadListen();
multiplyOperatorListen();




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
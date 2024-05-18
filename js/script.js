class Calculator {
    constructor(historyElement, outputElement) {
        this.historyElement = historyElement;
        this.outputElement = outputElement;
        this.memory = 0;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.history = [];
        this.updateDisplay();
    }

    toggleSign() {
        this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
        this.updateDisplay();
    }

    appendNumber(number) {
        if (this.currentOperand === '0' && number === 0) return;
        if (this.currentOperand.includes('.') && number === '.') return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand += number.toString();
        }
        this.updateDisplay();
    }

    appendDecimal() {
        if (this.currentOperand.includes('.')) return;
        this.currentOperand += '.';
        this.updateDisplay();
    }

    setOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    calculate() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        const operationText = `${this.previousOperand} ${this.operation} ${current} = ${result}`;
        this.history.push(operationText);
        this.manageHistory();
        this.currentOperand = result.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    percent() {
        this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
        this.updateDisplay();
    }

    factorial() {
        const num = parseInt(this.currentOperand);
        if (num < 0) return;
        let result = 1;
        for (let i = 1; i <= num; i++) {
            result *= i;
        }
        this.currentOperand = result.toString();
        this.updateDisplay();
    }

    squareRoot() {
        this.currentOperand = Math.sqrt(parseFloat(this.currentOperand)).toString();
        this.updateDisplay();
    }

    exponentiation() {
        const base = parseFloat(this.currentOperand);
        const exponent = parseFloat(prompt('Enter exponent:'));
        this.currentOperand = Math.pow(base, exponent).toString();
        this.updateDisplay();
    }

    memoryAdd() {
        this.memory += parseFloat(this.currentOperand);
        this.updateDisplayMemory();
    }

    memorySubtract() {
        console.log("memoryS" + this.memory);
        this.memory -= parseFloat(this.currentOperand);
        this.updateDisplayMemory();
    }

    memoryRecall() {
        this.memory = parseFloat(this.currentOperand);
        this.updateDisplayMemory();
    }

    memoryClear() {
        this.memory = 0;
        this.updateDisplayMemory();
    }

    manageHistory() {
        const maxHistoryHeight = this.historyElement.parentElement.clientHeight * 0.65;
        const tempHistory = [...this.history];
        while (this.getHistoryHeight(tempHistory) > maxHistoryHeight && tempHistory.length > 0) {
            tempHistory.shift();
        }
        if (this.getHistoryHeight(tempHistory.concat([this.history[this.history.length - 1]])) > maxHistoryHeight) {
            while (this.getHistoryHeight(tempHistory.concat([this.history[this.history.length - 1]])) > maxHistoryHeight && tempHistory.length > 0) {
                tempHistory.shift();
            }
        }
        this.history = tempHistory;
    }

    getHistoryHeight(historyArray) {
        const tempElement = document.createElement('div');
        tempElement.style.visibility = 'hidden';
        tempElement.style.position = 'absolute';
        this.historyElement.parentElement.appendChild(tempElement);
        tempElement.innerText = historyArray.join('\n');
        const height = tempElement.clientHeight;
        this.historyElement.parentElement.removeChild(tempElement);
        return height;
    }

    updateDisplay() {
        this.outputElement.innerText = this.currentOperand;
        this.historyElement.innerText = this.history.join('\n');
    }

    updateDisplayMemory() {
        this.outputElement.innerText  = this.memory;
        this.historyElement.innerText = this.history.join('\n');
    }
}

const historyElement = document.querySelector('#history');
const outputElement = document.querySelector('#output');
const calculator = new Calculator(historyElement, outputElement);

function appendNumber(number) {
    calculator.appendNumber(number);
}

function appendDecimal() {
    calculator.appendDecimal();
}

function setOperation(operation) {
    calculator.setOperation(operation);
}

function calculate() {
    calculator.calculate();
}

function percent() {
    calculator.percent();
}

function clearOutput() {
    calculator.clear();
}

function toggleSign() {
    calculator.toggleSign();
}

function factorial() {
    calculator.factorial();
}

function squareRoot() {
    calculator.squareRoot();
}

function exponentiation() {
    calculator.exponentiation();
}

function memoryAdd() {
    calculator.memoryAdd();
}

function memorySubtract() {
    calculator.memorySubtract();
}

function memoryRecall() {
    calculator.memoryRecall();
}

function memoryClear() {
    calculator.memoryClear();
}


import { useState } from 'react';
import { cn } from '@/lib/utils';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (error) {
      setError(false);
      setDisplay(digit);
      return;
    }
    
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (error) {
      setError(false);
      setDisplay('0.');
      return;
    }
    
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setError(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (error) {
      setError(false);
      setFirstOperand(inputValue);
      setOperator(nextOperator);
      setWaitingForSecondOperand(true);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      if (result === "Error") {
        setDisplay("Error");
        setError(true);
        setFirstOperand(null);
      } else {
        setDisplay(String(result));
        setFirstOperand(result);
      }
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand: number, secondOperand: number, operator: string): number | "Error" => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '×':
        return firstOperand * secondOperand;
      case '÷':
        return secondOperand !== 0 ? firstOperand / secondOperand : "Error";
      default:
        return secondOperand;
    }
  };

  const handleEquals = () => {
    if (!operator || firstOperand === null) return;

    const inputValue = parseFloat(display);
    const result = calculate(firstOperand, inputValue, operator);
    
    if (result === "Error") {
      setDisplay("Error");
      setError(true);
      setFirstOperand(null);
    } else {
      setDisplay(String(result));
      setFirstOperand(result);
    }
    
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  const CalcButton = ({ 
    onClick, 
    className, 
    children 
  }: { 
    onClick: () => void, 
    className?: string, 
    children: React.ReactNode 
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 py-4 text-xl font-medium rounded-xl transition-all duration-200 active:scale-95",
        "hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50",
        className
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl overflow-hidden shadow-xl">
      {/* Display */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 flex justify-end">
        <div className="text-right">
          <div className="text-white text-opacity-70 text-sm h-6">
            {firstOperand !== null && !error ? `${firstOperand} ${operator}` : ''}
          </div>
          <div className="text-white text-4xl font-light truncate max-w-[270px]">
            {display}
          </div>
        </div>
      </div>

      {/* Button Pad */}
      <div className="bg-gray-50 p-4 grid grid-cols-4 gap-2">
        {/* First Row */}
        <CalcButton 
          onClick={clearDisplay} 
          className="bg-red-500 text-white"
        >
          AC
        </CalcButton>
        <CalcButton 
          onClick={() => {
            if (error) {
              clearDisplay();
              return;
            }
            setDisplay(display === '0' ? '0' : display.slice(0, -1) || '0');
          }} 
          className="bg-gray-200 text-gray-800"
        >
          ⌫
        </CalcButton>
        <CalcButton 
          onClick={() => {
            if (error) {
              clearDisplay();
              return;
            }
            setDisplay(String(parseFloat(display) / 100));
          }} 
          className="bg-gray-200 text-gray-800"
        >
          %
        </CalcButton>
        <CalcButton 
          onClick={() => performOperation('÷')} 
          className="bg-purple-500 text-white"
        >
          ÷
        </CalcButton>
        
        {/* Second Row */}
        <CalcButton 
          onClick={() => inputDigit('7')} 
          className="bg-white text-gray-800"
        >
          7
        </CalcButton>
        <CalcButton 
          onClick={() => inputDigit('8')} 
          className="bg-white text-gray-800"
        >
          8
        </CalcButton>
        <CalcButton 
          onClick={() => inputDigit('9')} 
          className="bg-white text-gray-800"
        >
          9
        </CalcButton>
        <CalcButton 
          onClick={() => performOperation('×')} 
          className="bg-purple-500 text-white"
        >
          ×
        </CalcButton>
        
        {/* Third Row */}
        <CalcButton 
          onClick={() => inputDigit('4')} 
          className="bg-white text-gray-800"
        >
          4
        </CalcButton>
        <CalcButton 
          onClick={() => inputDigit('5')} 
          className="bg-white text-gray-800"
        >
          5
        </CalcButton>
        <CalcButton 
          onClick={() => inputDigit('6')} 
          className="bg-white text-gray-800"
        >
          6
        </CalcButton>
        <CalcButton 
          onClick={() => performOperation('-')} 
          className="bg-purple-500 text-white"
        >
          -
        </CalcButton>
        
        {/* Fourth Row */}
        <CalcButton 
          onClick={() => inputDigit('1')} 
          className="bg-white text-gray-800"
        >
          1
        </CalcButton>
        <CalcButton 
          onClick={() => inputDigit('2')} 
          className="bg-white text-gray-800"
        >
          2
        </CalcButton>
        <CalcButton 
          onClick={() => inputDigit('3')} 
          className="bg-white text-gray-800"
        >
          3
        </CalcButton>
        <CalcButton 
          onClick={() => performOperation('+')} 
          className="bg-purple-500 text-white"
        >
          +
        </CalcButton>
        
        {/* Fifth Row */}
        <CalcButton 
          onClick={() => inputDigit('0')} 
          className="col-span-2 bg-white text-gray-800"
        >
          0
        </CalcButton>
        <CalcButton 
          onClick={inputDecimal} 
          className="bg-white text-gray-800"
        >
          .
        </CalcButton>
        <CalcButton 
          onClick={handleEquals} 
          className="bg-purple-600 text-white hover:bg-purple-700"
        >
          =
        </CalcButton>
      </div>
    </div>
  );
};

export default Calculator;

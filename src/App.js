import { useReducer } from 'react';
import './styles.css'
import DigitalButton from './DigitalButton';
import OperationButton from './OperationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGITAL: 'delete-digital',
  EVALUATE: 'evaluate'
}

function reducer(state, {type, payload}) {
  switch(type) {

    case ACTIONS.ADD_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            currentOp: payload.digit,
            overwrite: false
          }
        }
        if (payload.digit === "0" && state.currentOp === "0") {return state;}
        if (payload.digit === "." && state.currentOp.includes(".")) {return state;}
        return {
          ...state,
          currentOp: `${state.currentOp || ""}${payload.digit}`
        }
    case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOp == null && state.previousOp == null ) {
          return state
        }
        if(state.currentOp == null) {
          return {
            ...state,
            operation: payload.operation
          }
        }
        if (state.previousOp == null) {
          return {
            ...state,
            operation: payload.operation,
            previousOp: state.currentOp,
            currentOp: null
          }
        }
        return {
          ...state,
          previousOp: evaluate(state),
          operation: payload.operation,
          currentOp: null
        }
    case ACTIONS.CLEAR:
      return{}
    case ACTIONS.DELETE_DIGITAL:
      if (state.overwrite) {
        return {
          ...state,
          currentOp:null,
          overwrite: false
        }
      }
      if (state.currentOp == null) return state
      if (state.currentOp.length === 1) {
        return {
          ...state,
          currentOp: null
        }
        
      }
      return {
        ...state,
        currentOp: state.currentOp.slice(0,-1)
      }
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOp == null || state.previousOp == null) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOp: null,
        operation: null,
        currentOp: evaluate(state)
      }
  }
}

function evaluate({ currentOp, previousOp, operation}) {
  const prev = parseFloat(previousOp)
  const curr = parseFloat(currentOp)
  if (isNaN(prev) || isNaN(curr)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + curr
      break
    case "-":
      computation = prev - curr
      break
    case "*":
      computation = prev * curr
      break
    case "/":
      computation = prev / curr
      break
    
  }
  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0
})

function formatOperand(operand) {
  if (operand == null ) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{currentOp, previousOp, operation}, dispatch] = useReducer(reducer, {})
  return (
    <div className="calc-grid">
      <div className="output">
        <div className="prev">{formatOperand(previousOp)}  {operation}</div>
        <div className="curr">{formatOperand(currentOp)}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGITAL })}>DEdfL</button>
      {/* <button>/</button> */}
      <OperationButton operation='/' dispatch={dispatch}/>
      <DigitalButton digit='1' dispatch={dispatch}/>
      <DigitalButton digit='2' dispatch={dispatch}/>
      <DigitalButton digit='3' dispatch={dispatch}/>
      <OperationButton operation='*' dispatch={dispatch}/>
      <DigitalButton digit='4' dispatch={dispatch}/>
      <DigitalButton digit='5' dispatch={dispatch}/>
      <DigitalButton digit='6' dispatch={dispatch}/>
      <OperationButton operation='+' dispatch={dispatch}/>
      <DigitalButton digit='7' dispatch={dispatch}/>
      <DigitalButton digit='8' dispatch={dispatch}/>
      <DigitalButton digit='9' dispatch={dispatch}/>
      <OperationButton operation='-' dispatch={dispatch}/>
      <DigitalButton digit='.' dispatch={dispatch}/>
      <DigitalButton digit='0' dispatch={dispatch}/>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;

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
        return {
          ...state,
          currentOp: `${state.currentOp || ""}${payload.digit}`
        }
  }
}

function App() {
  const [{currentOp, previousOp, operation}, dispatch] = useReducer(reducer, {})
  return (
    <div className="calc-grid">
      <div className="output">
        <div className="prev">{previousOp}  {operation}</div>
        <div className="curr">{currentOp}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
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
      <button className="span-two">=</button>
    </div>
  );
}

export default App;

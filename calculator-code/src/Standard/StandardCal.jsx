import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import DigitBtn from './DigitBtn'
import OptBtn from './OptBtn'
import { useReducer } from 'react'

export const ACTIONS ={
    ENTER_DIGIT: "enter-digit",
    C: 'clear',
    CE: 'ce',
    DELETE_DIGIT: 'delete-digit',
    CHOOSE_OPT: 'choose-operation',
    EVALUATE : 'evaluate'
}

function reducer(state,{type, payload}){
    switch(type){
        case ACTIONS.ENTER_DIGIT:   
            if(state.overwrite)return{
                ...state,
                currentOperand: payload.digit,
                overwrite:false
            }
            if(payload.digit ==="0" && state.currentOperand === "0") return state          
            if(payload.digit !="0" && state.currentOperand === "0") return {
                ...state,
                currentOperand : `${payload.digit}`
            }          
            if(payload.digit ==="." && state.currentOperand.includes('.')) return state        
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
            }
        case ACTIONS.CE:
            return{
                ...state,
                currentOperand: `0`
            }
        case ACTIONS.C:
            return{currentOperand: '0'}
        case ACTIONS.CHOOSE_OPT:
            if(state.currentOperand === '0' ) return{
                ...state,
                operation: payload.operation,
                previousOperand: 0,
                currentOperand: '0'
            }

            if(state.currentOperand != '0' && state.previousOperand == null) return{
                ...state,
                operation: payload.operation,
                previousOperand: state.currentOperand,
                currentOperand: '0'
            }

            return{
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: '0'
            }
        case ACTIONS.EVALUATE:
            if(state.previousOperand === null || state.operation === null) return state
            return{
                ...state,
                previousOperand: null,
                overwrite: true,
                operation: null,
                currentOperand: evaluate(state)
            }
        case ACTIONS.DELETE_DIGIT:
            if(state.currentOperand === "0")return state
            if(state.currentOperand.length == 1) return{
                ...state,
                currentOperand: 0
            }

            return{
                ...state,
                currentOperand: state.currentOperand.substring(0, state.currentOperand.length -1)
            }
    }
}

function evaluate({currentOperand, previousOperand, operation}){
    const prev = parseFloat(previousOperand)
    const curr= parseFloat(currentOperand)
    if(isNaN(previousOperand)) return ""

    let comp= ''
    switch(operation){
        case "+" :
            comp = prev + curr
            break
        case "-":
            comp = prev - curr
            break 
        case "x":
            comp = prev * curr
            break 
        case "/":
        comp = prev / curr
        break 
    }

    return comp.toString()
}

export default function StandardCal(){
    const [{currentOperand, previousOperand, operation, overwrite}, dispatch] = useReducer(reducer, {currentOperand: '0'})
    return(
        <main>
            <div className="cal-grid">
                <div className="output">
                    <div className="prev-out">{previousOperand} {operation}</div>
                    <div className="current-out">{currentOperand}</div>
                </div>
                <button onClick={()=>{dispatch({type: ACTIONS.CE})}} className='opt'>CE</button>
                <button onClick={()=>{dispatch({type: ACTIONS.C})}} className='opt'>C</button>
                <button onClick={()=>{dispatch({type: ACTIONS.DELETE_DIGIT})}} className='opt'><FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon></button>
                <OptBtn dispatch={dispatch} opt={"/"} />
                <DigitBtn dispatch={dispatch} digit={'7'} />
                <DigitBtn dispatch={dispatch} digit={'8'} />
                <DigitBtn dispatch={dispatch} digit={'9'} />
                <OptBtn dispatch={dispatch} opt={"x"} />
                <DigitBtn dispatch={dispatch} digit={'4'} />
                <DigitBtn dispatch={dispatch} digit={'5'} />
                <DigitBtn dispatch={dispatch} digit={'6'} />
                <OptBtn dispatch={dispatch} opt={"-"} />
                <DigitBtn dispatch={dispatch} digit={'1'} />
                <DigitBtn dispatch={dispatch} digit={'2'} />
                <DigitBtn dispatch={dispatch} digit={'3'} />
                <OptBtn dispatch={dispatch} opt={"+"} />
                <DigitBtn dispatch={dispatch} digit={"."} />
                <DigitBtn dispatch={dispatch} digit={'0'} />
                <button onClick={()=>{dispatch({type: ACTIONS.EVALUATE})}} className='span-two equal' >=</button>
            </div>
        </main>
    )
}
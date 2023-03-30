import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import DigitBtn from './DigiBtn3'
import OptBtn from './OptBtn3'
import { useReducer, useState } from 'react'

export const ACTIONS ={
    ENTER_DIGIT: "enter-digit",
    C: 'clear',
    DELETE_DIGIT: 'delete-digit',
    CHOOSE_OPT: 'choose-operation',
    EVALUATE : 'evaluate',
    OPEN_BRACH: 'open',
    CLOSE_BRACH: 'close',
    CHOOSE_OPT_BRACKET: 'choose-operation-bracket'
}

function reducer(state,{type, payload}){
    switch(type){
        case ACTIONS.ENTER_DIGIT:   
            if(state.bracket){
                if(state.overwrite)return{
                    ...state,
                    currentOperand: payload.digit,
                    overwrite:false,
                    fullEqu:''
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
            }
            if(!state.bracket){
                if(payload.digit ==="0" && state.currentOperandBracket === "0") return state
                if(payload.digit !="0" && state.currentOperandBracket === "0") return {
                    ...state,
                    currentOperandBracket : `${payload.digit}`
                }     
                if(payload.digit ==="." && state.currentOperandBracket.includes('.')) return state        
                return {
                    ...state,
                    currentOperandBracket: `${state.currentOperandBracket || ""}${payload.digit}`
                }
            }
        case ACTIONS.C:
            return{currentOperand: '0', bracket: true, currentOperandBracket: '0'}
        case ACTIONS.CHOOSE_OPT:
                
                if(state.currentOperand === '0' && !state.fullEqu ) return{
                    ...state,
                    operation: payload.operation,
                    currentOperand: '0',
                    fullEqu: `0 ${payload.operation}`
                }

    
                if(state.currentOperand != '0'  && state.fullEqu) return{
                    ...state,
                    operation: payload.operation,
                    currentOperand: '0',
                    fullEqu: `${state.fullEqu} ${state.currentOperand} ${payload.operation}`
                }
                
                if(state.currentOperand != '0'  && !state.fullEqu) return{
                    ...state,
                    operation: payload.operation,
                    currentOperand: '0',
                    fullEqu: `${state.currentOperand} ${payload.operation}`
                }
                
                return{
                    ...state,
                    operation: payload.operation,
                    fullEqu: `${state.fullEqu} ${payload.operation}`
                }
            
        case ACTIONS.CHOOSE_OPT_BRACKET:
            if(state.currentOperandBracket === '0' ) return{
                ...state,
                operationBracket: payload.operation,
                currentOperandBracket: '0',
                fullEqu: `${state.fullEqu} ${state.currentOperandBracket} ${payload.operation}`
            }

            if(state.currentOperandBracket != '0') return{
                ...state,
                operationBracket: payload.operation,
                currentOperandBracket: '0',
                fullEqu: `${state.fullEqu} ${state.currentOperandBracket} ${payload.operation}`
            }
            
            return{
                ...state,
                operationBracket: payload.operation,
                currentOperandBracket: '0',
                fullEqu: `${state.fullEqu} ${state.currentOperandBracket} ${payload.operation}`
            }
            
        case ACTIONS.EVALUATE:
            return{
                fullEqu:`${state.fullEqu} ${state.currentOperand} `,
                overwrite:true,
                currentOperand: '0', bracket: true, currentOperandBracket: '0',
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
        case ACTIONS.OPEN_BRACH:
            if(!state.bracket) return state
            if(state.fullEqu)return{
                ...state,
                bracket: false,
                currentOperand: 0,
                fullEqu : `${state.fullEqu} (`
            }
            return{
                ...state,
                bracket: false,
                fullEqu : `(`
            }
        case ACTIONS.CLOSE_BRACH:
            if(state.bracket) return state
            return{
                ...state,
                bracket: true,
                operation: null,
                operationBracket: null,
                currentOperandBracket: 0,
                fullEqu : `${state.fullEqu} ${state.currentOperandBracket}) `
            }       
    }
}




export default function Ver3Cal(){
    const [{currentOperand, overwrite, bracket, currentOperandBracket,fullEqu}, dispatch] = useReducer(reducer, {currentOperand: '0', bracket: true, currentOperandBracket: '0'})
    const [final,setFinal]=useState('')
    return(
        <main>
            <div className="cal-grid">
                <div className="output">
                    <div className="prev-out">{final} </div>
                    <div className="prev-out">{fullEqu} </div>
                    <div className="current-out">{bracket ? currentOperand : currentOperandBracket}</div>
                </div>
                <button onClick={()=>{dispatch({type: ACTIONS.OPEN_BRACH})}} className='opt'>(</button>
                <button onClick={()=>{dispatch({type: ACTIONS.CLOSE_BRACH})}} className='opt'>)</button>
                <button onClick={()=>{dispatch({type: ACTIONS.C});setFinal('')}} className='opt'>C</button>
                <OptBtn bracket={bracket} dispatch={dispatch} opt={"/"} />
                <DigitBtn dispatch={dispatch} digit={'7'} />
                <DigitBtn dispatch={dispatch} digit={'8'} />
                <DigitBtn dispatch={dispatch} digit={'9'} />
                <OptBtn bracket={bracket} dispatch={dispatch} opt={"*"} />
                <DigitBtn dispatch={dispatch} digit={'4'} />
                <DigitBtn dispatch={dispatch} digit={'5'} />
                <DigitBtn dispatch={dispatch} digit={'6'} />
                <OptBtn bracket={bracket} dispatch={dispatch} opt={"-"} />
                <DigitBtn dispatch={dispatch} digit={'1'} />
                <DigitBtn dispatch={dispatch} digit={'2'} />
                <DigitBtn dispatch={dispatch} digit={'3'} />
                <OptBtn bracket={bracket} dispatch={dispatch} opt={"+"} />
                <DigitBtn dispatch={dispatch} digit={"."} />
                <DigitBtn dispatch={dispatch} digit={'0'} />
                <button onClick={()=>{dispatch({type: ACTIONS.DELETE_DIGIT})}} className='opt'><FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon></button>
                <button onClick={()=>{dispatch({type: ACTIONS.EVALUATE});setFinal(eval(`${fullEqu} ${currentOperand}`))}} className=' equal' >=</button>
            </div>
        </main>
    )
}
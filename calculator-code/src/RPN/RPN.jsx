import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import DigitBtn from './DigitBtn2'
import { useReducer, useState } from 'react'

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
            if(payload.digit !="0" && state.currentOperand === null) return {
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
                currentOperand: null
            }
        case ACTIONS.C:
            return{}
        case ACTIONS.EVALUATE:
            return{
                ...state,
                currentOperand: null
            }
    }
}



export default function RPN(){
    const [{currentOperand, operation, overwrite}, dispatch] = useReducer(reducer, {})
    const [stack,setStack]=useState([]);
    


    function plus(currentOperand){ 
        let arr = stack
        if(currentOperand){arr.push(currentOperand)}
        const curr= parseFloat(arr.pop())
        const prev = parseFloat(arr.pop())
        setStack(arr)
        
        let comp= prev + curr
        setStack([...stack,comp.toString()])
        return comp.toString()
    }
    function minus(currentOperand){ 
        let arr = stack
        if(currentOperand){arr.push(currentOperand)}
        const curr= parseFloat(arr.pop())
        const prev = parseFloat(arr.pop())
        setStack(arr)
        
        let comp= prev - curr
        setStack([...stack,comp.toString()])
        return comp.toString()
    }
    function divide(currentOperand){ 
        let arr = stack
        if(currentOperand){arr.push(currentOperand)}
        const curr= parseFloat(arr.pop())
        const prev = parseFloat(arr.pop())
        setStack(arr)
        
        let comp= prev / curr
        setStack([...stack,comp.toString()])
        return comp.toString()
    }
    function mul(currentOperand){ 
        let arr = stack
        if(currentOperand){arr.push(currentOperand)}
        const curr= parseFloat(arr.pop())
        const prev = parseFloat(arr.pop())
        setStack(arr)
        
        let comp= prev * curr
        setStack([...stack,comp.toString()])
        return comp.toString()
    }

    return(
        <main>
            <div className="cal-grid">
                <div className="output">
                    <div className="prev-out">{stack[stack.length-1]} {operation}</div>
                    <div className="current-out">{currentOperand}</div>
                </div>
                <button onClick={()=>{dispatch({type: ACTIONS.CE})}} className='opt'>CE</button>
                <button onClick={()=>{setStack([]);dispatch({type: ACTIONS.C})}} className='opt'>C</button>
                <button className='opt' onClick={()=>{console.log(stack)}}>stack</button>
                <button className='opt' onClick={()=>{divide(currentOperand);dispatch({type: ACTIONS.EVALUATE})}} >/</button>
                <DigitBtn dispatch={dispatch} digit={'7'} />
                <DigitBtn dispatch={dispatch} digit={'8'} />
                <DigitBtn dispatch={dispatch} digit={'9'} />
                <button className='opt' onClick={()=>{mul(currentOperand);dispatch({type: ACTIONS.EVALUATE})}} >x</button>
                <DigitBtn dispatch={dispatch} digit={'4'} />
                <DigitBtn dispatch={dispatch} digit={'5'} />
                <DigitBtn dispatch={dispatch} digit={'6'} />
                <button className='opt' onClick={()=>{minus(currentOperand);dispatch({type: ACTIONS.EVALUATE})}} >-</button>
                <DigitBtn dispatch={dispatch} digit={'1'} />
                <DigitBtn dispatch={dispatch} digit={'2'} />
                <DigitBtn dispatch={dispatch} digit={'3'} />
                <button className='opt' onClick={()=>{plus(currentOperand);dispatch({type: ACTIONS.EVALUATE})}} >+</button>
                <DigitBtn dispatch={dispatch} digit={"."} />
                <DigitBtn dispatch={dispatch} digit={'0'} />
                <button onClick={()=>{setStack([...stack,currentOperand]);dispatch({type: ACTIONS.EVALUATE})}} className='span-two equal' >Enter</button>
            </div>

            <h1>the stack btn log the stack in browser console, im running out of time here </h1>
        </main>
    )
}
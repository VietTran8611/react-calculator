import { ACTIONS } from "./Ver3Cal"

export default function DigitBtn(props){
    return(
       <button onClick={()=>{props.dispatch({type: ACTIONS.ENTER_DIGIT, payload: {digit: props.digit}})}} className="digit">{props.digit}</button>
    )
}
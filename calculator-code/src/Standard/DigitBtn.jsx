import { ACTIONS } from "./StandardCal"

export default function DigitBtn(props){
    return(
       <button onClick={()=>{props.dispatch({type: ACTIONS.ENTER_DIGIT, payload: {digit: props.digit}})}} className="digit">{props.digit}</button>
    )
}
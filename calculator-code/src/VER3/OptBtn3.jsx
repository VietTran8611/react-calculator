import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import { ACTIONS } from './Ver3Cal'

export default function OptBtn(props){

    return(
        <>
            {props.bracket 
                ? <button onClick={()=>{console.log('hell'),props.dispatch({type: ACTIONS.CHOOSE_OPT, payload: {operation: props.opt}})}}  className='opt'>{props.opt}</button> 
                : <button onClick={()=>{console.log('hello'),props.dispatch({type: ACTIONS.CHOOSE_OPT_BRACKET, payload: {operation: props.opt}})}}  className='opt'>{props.opt}</button>
            }
        </>
    )
}
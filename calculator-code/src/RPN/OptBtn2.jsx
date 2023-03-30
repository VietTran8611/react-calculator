import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import { ACTIONS } from './RPN'
export default function OptBtn(props){
    return(
        <button onClick={()=>{props.dispatch({type: ACTIONS.CHOOSE_OPT, payload: {operation: props.opt}})}}  className='opt'>{props.opt}</button>
    )
}
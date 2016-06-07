import {
    ADD_ERROR_MESSAGE,
    RESET_ERROR_MESSAGE
} from '../actions/error'

const initalState = {
    errorMessage:'',
    dismiss:true
}
const ACTION_HANDLERS = {
    [ADD_ERROR_MESSAGE]:(state,action)=>{
        if(state.dismiss){
            return {
                dismiss:false,
                errorMessage:action.message
            }
        }else{
            return {
                dismiss:true,
                errorMessage: action.message
            }
        }
    },
    [RESET_ERROR_MESSAGE]:()=>({
        dismiss:true,
        errorMessage:''
    })
}
const error = (state = initalState, action)=>{
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state,action):state
}

export default error
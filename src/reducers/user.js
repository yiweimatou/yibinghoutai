import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAILURE,
    UPDATE_USER_TOTAL,
    USER_GET_SUCCESS
} from '../actions/user'

const initalState = {
    list: [],
    loading: false,
    errorMessage: '',
    limit: 9,
    offset: 1,
    total: 0,
    detail:null
}

const ACTION_HANDLERS = {
    [USER_LIST_REQUEST]: state => ({
        ...state,
        loading: true
    }),
    [USER_LIST_SUCCESS]: (state, action) => ({
        ...state,
        loading: false,
        list: action.list,
        offset: action.offset
    }),
    [USER_LIST_FAILURE]: (state, action) => ({
        ...state,
        loading: false,
        errorMessage: action.message
    }),
    [UPDATE_USER_TOTAL]: (state, action) => ({
        ...state,
        total: action.count
    }),
    [USER_GET_SUCCESS] : (state,action) => ({
        ...state,
        detail:Object.assign({},state.detail,action.user)
    })
}

const user = (state = initalState, action) => {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

export default user
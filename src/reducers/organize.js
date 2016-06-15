import {
    FETCH_ORGANIZE_LIST_REQUEST,
    FETCH_ORGANIZE_LIST_SUCCESS,
    FETCH_ORGANIZE_LIST_FAILURE,
    UPDATE_ORGANIZE_TOTAL,
    REMOVE_ORGANIZE_SUCCESS,
    GET_ORGANIZE_REQUEST,
    GET_ORGANIZE_SUCCESS,
    GET_ORGANIZE_FAILURE
} from 'actions/organize'

const initalState = {
    list: [],
    loading: false,
    errorMessage: '',
    limit:9,
    offset:1,
    total:0,
    detail:null
}

const ACTION_HANDLERS = {
    [FETCH_ORGANIZE_LIST_REQUEST]: state => ({
        ...state,
        loading: true
    }),
    [FETCH_ORGANIZE_LIST_SUCCESS]: (state, action) => ({
        ...state,
        loading: false,
        list: action.list,
        offset:action.offset
    }),
    [FETCH_ORGANIZE_LIST_FAILURE]: (state, action) => ({
        ...state,
        loading: false,
        errorMessage: action.errorMessage
    }),
    [UPDATE_ORGANIZE_TOTAL] : (state,action) => ({
        ...state,
        total:action.count
    }),
    [REMOVE_ORGANIZE_SUCCESS] : (state,action) => ({
      ...state,
      list:state.list.map(item => {
          if(item.oid === action.oid){
                item.state = 3
                item.oname = item.oid
          }
          return item
      })  
    }),
    [GET_ORGANIZE_REQUEST] : state => ({
        ...state,
        loading:true
    }),
    [GET_ORGANIZE_FAILURE] : (state,action) => ({
        ...state,
        loading:false,
        errorMessage:action.message
    }),
    [GET_ORGANIZE_SUCCESS] : (state,action) => ({
        ...state,
        loading:false,
        detail:Object.assign({},state.detail,action.organize)
    })
}

const organize = (state = initalState, action) => {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

export default organize
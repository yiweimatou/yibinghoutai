import {
    FETCH_ORGANIZE_LIST_REQUEST,
    FETCH_ORGANIZE_LIST_SUCCESS,
    FETCH_ORGANIZE_LIST_FAILURE,
    UPDATE_ORGANIZE_TOTAL,
    REMOVE_ORGANIZE_SUCCESS
} from 'actions/organize'

const initalState = {
    list: [],
    loading: false,
    lastFetchTime: 0,
    errorMessage: '',
    limit:9,
    offset:1,
    total:0
}

const ACTION_HANDLERS = {
    [FETCH_ORGANIZE_LIST_REQUEST]: state => ({
        ...state,
        loading: true
    }),
    [FETCH_ORGANIZE_LIST_SUCCESS]: (state, action) => ({
        ...state,
        loading: false,
        lastFetchTime: action.lastFetchTime,
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
        total:action.total
    }),
    [REMOVE_ORGANIZE_SUCCESS] : (state,action) => ({
      ...state,
      list:state.list.filter(item => {
          if(item.oid !== action.oid){
              return true
          }
      })  
    })
}

const organize = (state = initalState, action) => {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

export default organize
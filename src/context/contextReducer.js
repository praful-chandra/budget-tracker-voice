const contextReducer = (state, action) => {

  if(action.type === 'DELETE_TRANSACTION'){

    return  state.filter((t)=>t.id !== action.payload);

  }else if (action.type === 'ADD_TRANSACTION'){

    return [action.payload, ...state];

  }else{
      return state;
  }

};

export default contextReducer;

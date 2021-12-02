import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  loadingUser:false 
};

const userReducer = (state = INITIAL_STATE, action) => {
  
  switch (action.type) {

    case 'ORDER_UPDATE':return{
      ...state,
      currentUser:{...state.currentUser,...action.payload}
    }

    case 'Sign_IN_LOADING':return{
      ...state,
      loadingUser:true
    }

    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        loadingUser:false


      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        loadingUser:false

      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
        loadingUser:false

      };
    default:
      return state;
  }
};

export default userReducer;

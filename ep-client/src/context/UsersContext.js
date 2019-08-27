import createDataContext from './createDataContext';
import expressApi from '../api/expressApi';
import {users} from '../backend/query'


const INITIAL_STATE = {
  isRegModal: false,
  loading:true,
  users:[]
};

const userReducer = (state, action) => {
    switch (action.type) {
      case 'fetch_users':
        return {...state,users:action.payload};
        case 'reg_modal':
          return {...state,isRegModal:action.payload};
          case 'loader':
            return { ...state, loading: false };
      default:
        return state;
    }
  };


const fetchUsers = dispatch => async () => {
    const response = await expressApi.get(`/graphql?query=${users}`);
    // console.log('users :',response.data.data.users)
    setTimeout(() => {
      dispatch({ type: 'loader', payload: false });
      dispatch({ type: 'fetch_users', payload: response.data.data.users });
    }, 1000);

};


const openRegModal = dispatch => async (data) => {
  dispatch({ type: 'reg_modal', payload: data });

};

/**this is the magic part!!! */

const actions = {
  fetchUsers,
  openRegModal
}

export const { Provider, Context } = createDataContext(
    userReducer,
    actions,
    INITIAL_STATE
  );
  












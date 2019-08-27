import createDataContext from './createDataContext';
import expressApi from '../api/expressApi';
import { createUser,updateRepUser } from '../backend/mutation'
import { navigate } from '../navigationRef';

const INITIAL_STATE = {
  loading: false,
  errorMessage: '',
  user: {}
};

const repReducer = (state, action) => {
  switch (action.type) {
    case 'create_rep':
      return { ...state, user: action.payload, loading: true };
      case 'update_rep':
        return { ...state, user: action.payload, loading: true };
    case 'loader':
      return { ...state, loading: false };
    case 'add_error':
      return { ...state, errorMessage: action.payload, loading: true };
    case 'clear_error_message':
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};


const createRep = dispatch => async (input) => {
  // console.log('createRep :',input)
  try {
    const response = await expressApi.post('/graphql', { query: createUser, variables: input })
    // console.log('users :',response.data.data.createUser)

    if (response.data.data.createUser.username) {
      dispatch({ type: 'create_rep', payload: response.data.data.createUser });
      setTimeout(() => {
        dispatch({ type: 'loader', payload: false });
        navigate('AddRep');
      }, 1000);

    } else {
      setTimeout(() => {
        dispatch({ type: 'loader', payload: false });
      }, 1000);
      dispatch({ type: 'add_error', payload: 'Invalid data....' });
    }

  } catch (err) {
    console.log('graphql error :', err)
    // step 5:Dispatch an action to update state with an error message
    setTimeout(() => {
      dispatch({ type: 'loader', payload: false });
    }, 1000);
    // const graphQLErrors = err.map(error => error); // TO DO: nned to fix
    dispatch({ type: 'add_error', payload: 'Invalid data....' });
  }

};

const updateRep = dispatch => async (input) => {
  // console.log('input :',input)
  try {
    const response = await expressApi.post('/graphql', { query: updateRepUser, variables: input })
    // console.log('updateRep :',response.data.data.updateRep)

    if (response.data.data.updateRep.id) {
      dispatch({ type: 'update_rep', payload: response.data.data.updateRep });
      setTimeout(() => {
        dispatch({ type: 'loader', payload: false });
        navigate('AddRep');
      }, 1000);

    } else {
      setTimeout(() => {
        dispatch({ type: 'loader', payload: false });
      }, 1000);
      dispatch({ type: 'add_error', payload: 'Invalid data....' });
    }

  } catch (err) {
    console.log('graphql error :', err)
    // step 5:Dispatch an action to update state with an error message
    setTimeout(() => {
      dispatch({ type: 'loader', payload: false });
    }, 1000);
    // const graphQLErrors = err.map(error => error); // TO DO: nned to fix
    dispatch({ type: 'add_error', payload: 'Invalid data....' });
  }

};


const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};


/**this is the magic part!!! */

const actions = {
  createRep, updateRep,clearErrorMessage
}

export const { Provider, Context } = createDataContext(
  repReducer,
  actions,
  INITIAL_STATE
);



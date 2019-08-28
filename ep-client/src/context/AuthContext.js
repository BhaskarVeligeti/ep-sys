import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import expressApi from '../api/expressApi';
import { navigate } from '../navigationRef';


/*
  "authUser": Object {
    "role": "5d5c3e1546205407880fad92",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDVjNWYwYTcyYWYyYzE0NDBmOWQ5NGEiLCJpYXQiOjE1NjY0MjQ1MDd9.uv6v9ruEyVEX8jCMlq7JzyqYxQFQ_yd9ZB-b3RauEyY",
    "username": "123",
  }
*/

const INITIAL_STATE = {
  username: '',
  password: '',
  firmName: '',
  rep: '',
  loading: false,
  errorMessage: '',
  authUser: {},
  token: null
};
/**
 * step 1 : reducer ( change the state of the app)
 */

const authReducer = (state, action) => {
  switch (action.type) {
    // case 'auth_user':
    //   return { ...state, authUser: action.payload };
    case 'signin':
      return { ...state, authUser: action.payload, loading: true };
    case 'loader':
      return { ...state, loading: false };
    case 'signout':
      return { ...state,...INITIAL_STATE,loading: true  };
    case 'add_error':
      return { ...state, errorMessage: action.payload, loading: true };
    case 'clear_error_message':
      return { ...state, ...INITIAL_STATE };

    case 'change_firmname':
      return { ...state, firmName: action.payload };
    case 'change_username':
      return { ...state, username: action.payload };
    case 'change_password':
      return { ...state, password: action.payload };
    case 'change_rep':
      return { ...state, rep: action.payload };


    case 'reset_form':
      return { ...state, ...INITIAL_STATE };


    default:
      return state;
  }
};

/**
 * step 2 : actions (  How we want to change the data! )
 */

const tryLocalSignin = dispatch => async () => {
  // step 1: Is there a token in AsyncStorage? if Yes then Navigate to Home
  const token = await AsyncStorage.getItem('token');
  const username = await AsyncStorage.getItem('username');
  const role = await AsyncStorage.getItem('role');
  // console.log('token:',token);

  const data = { token, username, role }

  if (token) {
    dispatch({ type: 'signin', payload: data });
    
    setTimeout(() => {
      dispatch({ type: 'loader', payload: false });
      // navigate('Home'); // TODO :change it back
      navigate('AdminTasks');
    }, 1000);
  } else {
    // step 2: Navigate to Signup
    navigate('Auth');
  }
};

const signin = dispatch => async ({ username, password }) => {

  try {

    // step 1: make api request
    const response = await expressApi.post('/signin', { username, password });
    // console.log('respone:',response.data);

    // step 2: Take JWT we get from API and store it on the device
    await AsyncStorage.multiSet([
      ['token', response.data.authUser.token],
      ['username', response.data.authUser.username],
      ['role', response.data.authUser.role]
    ]);

    // step 3:  Dispatch an action to put the token and user,role into state object as an object
    dispatch({ type: 'signin', payload: response.data.authUser });

    // step 4: Navigate the user to the 'Home'
    setTimeout(() => {
      dispatch({ type: 'loader', payload: false });
      navigate('Home');
    }, 1000)

  } catch (err) {
    // step 5:Dispatch an action to update state with an error message
    setTimeout(() => {
      dispatch({ type: 'loader', payload: false });
    }, 1000);
    dispatch({ type: 'add_error', payload: err.response.data.error });
  }
};

const signup = dispatch => async ({ firmName,username, password,rep  }) => {
  // console.log('signup@dispatch:',firmName,username, password,rep );
  try {

    // step 1: make api request
    const response = await expressApi.post('/signup', { firmName,username, password,rep });
    // console.log('respone:',response.data);

    // step 2: Take JWT we get from API and store it on the device
    await AsyncStorage.multiSet([
      ['token', response.data.authUser.token],
      ['username', response.data.authUser.username],
      ['role', response.data.authUser.role]
    ]);

    // step 3:  Dispatch an action to put the token and user,role into state object as an object
    dispatch({ type: 'signin', payload: response.data.authUser });

    // step 4: Navigate the user to the 'Home'
    setTimeout(() => {
      dispatch({ type: 'loader', payload: false });
      navigate('Home');
    }, 1000);


  } catch (err) {
    // console.log('calling signin action :',err.response.data.error)
    // step 5:Dispatch an action to update state with an error message
    setTimeout(() => {
      dispatch({ type: 'loader', payload: false });
    }, 1000);
    dispatch({ type: 'add_error', payload: err.response.data.error });
  }

};

const signout = dispatch => async () => {
  // step 1: remove token
  // await AsyncStorage.removeItem('token');
  await AsyncStorage.multiRemove(['token', 'username', 'role'])

  // step 2: disptch an action
  dispatch({ type: 'signout'  });

    // step 3: Navigate the user to the 'Signin'
  setTimeout(() => {
    dispatch({ type: 'loader', payload: false });
    navigate('Auth');
  }, 1000);

};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const onFirmnameChange = dispatch => firmName => {
  dispatch({ type: 'change_firmname', payload: firmName });
};


const onUsernameChange = dispatch => username => {
  dispatch({ type: 'change_username', payload: username });
};

const onPasswordChange = dispatch => password => {
  dispatch({ type: 'change_password', payload: password });
};

const onRepChange = dispatch => rep => {
  dispatch({ type: 'change_rep', payload: rep });
};


const resetForm = dispatch => () => {
  dispatch({ type: 'reset_form' });
};



/**this is the magic part!!! */

const actions = {
  signin,
  signout,
  signup,
  clearErrorMessage,
  onFirmnameChange,
  onUsernameChange,
  onPasswordChange,
  onRepChange,
  tryLocalSignin,
  resetForm
}

export const { Provider, Context } = createDataContext(
  authReducer,
  actions,
  INITIAL_STATE
);

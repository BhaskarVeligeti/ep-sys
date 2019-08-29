import createDataContext from './createDataContext';
import expressApi from '../api/expressApi';
import {products} from '../backend/query'


const INITIAL_STATE = {
  loading:true,
  products:[]
};

const productReducer = (state, action) => {
    switch (action.type) {
      case 'fetch_products':
        return {...state,products:action.payload};
          case 'loader':
            return { ...state, loading: false };
      default:
        return state;
    }
  };


const fetchProduct = dispatch => async () => {
    const response = await expressApi.get(`/graphql?query=${products}`);
    // console.log('products :',response.data.data.products)
    setTimeout(() => {
      dispatch({ type: 'loader', payload: false });
      dispatch({ type: 'fetch_products', payload: response.data.data.products });
    }, 1000);

};




/**this is the magic part!!! */

const actions = {
  fetchProduct
}

export const { Provider, Context } = createDataContext(
    productReducer,
    actions,
    INITIAL_STATE
  );
  












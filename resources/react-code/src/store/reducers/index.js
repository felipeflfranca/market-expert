import { combineReducers } from 'redux';

// index import
import customizationReducer from './customizationReducer';
import salesReducer from './salesReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const index = combineReducers({
    customization: customizationReducer,
    sales: salesReducer
});

export default index;

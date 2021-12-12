// action - state management
import * as actionTypes from '../actions';

export const initialState = {
    bag: [],
    search: '',
    products: []
};

const salesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT_TO_BAG:
            return {
                ...state,
                bag: action.bag
            };
        case actionTypes.SEARCH_PRODUCT:
            return {
                ...state,
                search: action.search,
                products: action.products
            };
        default:
            return state;
    }
};

export default salesReducer;

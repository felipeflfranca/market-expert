// action - state management
import * as actionTypes from '../actions';

export const initialState = {
    bag: [],
    totalBag: 0
};

const salesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT_TO_BAG:
            return {
                ...state,
                bag: action.bag,
                totalBag: action.total
            };
        default:
            return state;
    }
};

export default salesReducer;

// action - state management
import * as actionTypes from '../actions';

export const initialState = {
    bag: []
};

// ==============================|| SALES REDUCER ||============================== //

const salesReducer = (state = initialState, action) => {
    let amount = 1;
    let code = '';

    switch (action.type) {
        case actionTypes.ADD_PRODUCT_TO_BAG:
            code = `code-${action.product.code}`;

            if (state.bag[code]) {
                amount = state.bag[code].amount + 1;
            }

            state.bag[code] = {
                product: action.product,
                amount
            };

            return {
                ...state,
                bag: state.bag
            };
        default:
            return state;
    }
};

export default salesReducer;

// action - state management
import * as actionTypes from '../actions';

export const initialState = {
    bag: []
};

// ==============================|| SALES REDUCER ||============================== //

const salesReducer = (state = initialState, action) => {
    let quantity = action.quantityInTheBag;
    let code = '';

    switch (action.type) {
        case actionTypes.ADD_PRODUCT_TO_BAG:
            code = `code-${action.product.code}`;

            if (state.bag[code]) {
                quantity = state.bag[code].quantity + quantity;
            }

            if (state.total) {
                state.total += action.quantityInTheBag * action.product.value;
            } else {
                state.total = action.quantityInTheBag * action.product.value;
            }

            state.bag[code] = {
                product: action.product,
                quantity
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

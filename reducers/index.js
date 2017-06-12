import { combineReducers } from 'redux';
import { TRANSACTIONS_UPDATED } from '../actions';

function reducer(state = { updated: 0 }, action) {
    switch (action.type) {
        case TRANSACTIONS_UPDATED:
            return {
                updated: state.updated + 1
            };

        default:
            return state;
    }
}

export default combineReducers({
    transactions: reducer
});

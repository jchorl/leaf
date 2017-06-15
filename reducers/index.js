import { TRANSACTIONS_UPDATED } from '../actions';

export default function reducer(state = { updateCounter: 0 }, action) {
    switch (action.type) {
        case TRANSACTIONS_UPDATED: {
            let newState = Object.assign({}, state, { updateCounter: state.updateCounter + 1 });
            return newState;
        }

        default:
            return state;
    }
}

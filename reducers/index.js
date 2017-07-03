import { SET_BARCODE_INFO, TRANSACTIONS_UPDATED } from '../actions';

export default function reducer(state = { updateCounter: 0, barcodeInfo: {} }, action) {
    switch (action.type) {
        case TRANSACTIONS_UPDATED: {
            let newState = Object.assign({}, state, { updateCounter: state.updateCounter + 1 });
            return newState;
        }

        case SET_BARCODE_INFO:
            return Object.assign({}, state, { barcodeInfo: action.barcodeInfo });

        default:
            return state;
    }
}

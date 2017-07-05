import { SET_BARCODE_INFO, TEMPLATES_UPDATED, TRANSACTIONS_UPDATED } from '../actions';

export default function reducer(state = { updateCounter: 0, templateUpdateCounter: 0, barcodeInfo: {} }, action) {
    switch (action.type) {
        case TRANSACTIONS_UPDATED: {
            let newState = Object.assign({}, state, { updateCounter: state.updateCounter + 1 });
            return newState;
        }

        case TEMPLATES_UPDATED: {
            let newState = Object.assign({}, state, { templateUpdateCounter: state.templateUpdateCounter + 1 });
            return newState;
        }

        case SET_BARCODE_INFO:
            return Object.assign({}, state, { barcodeInfo: action.barcodeInfo });

        default:
            return state;
    }
}

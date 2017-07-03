export const TRANSACTIONS_UPDATED = 'TRANSACTIONS_UPDATED';
export function transactionsUpdated() {
    return {
        type: TRANSACTIONS_UPDATED
    };
}

export const SET_BARCODE_INFO = 'SET_BARCODE_INFO';
export function setBarcodeInfo(barcodeInfo) {
    return {
        type: SET_BARCODE_INFO,
        barcodeInfo
    }
}

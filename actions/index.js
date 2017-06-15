export const TRANSACTIONS_UPDATED = 'TRANSACTIONS_UPDATED';
export function transactionsUpdated() {
    console.log('transactionsUpdated action being dispatched');
    return {
        type: TRANSACTIONS_UPDATED
    };
}

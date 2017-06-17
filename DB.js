import { SQLite } from 'expo';

export default db = SQLite.openDatabase({ name: 'db.leaf' });

export function fetchTransactions(callback) {
    db.transaction(tx => {
        tx.executeSql(
            `select * from transactions;`,
            [],
            (_, { rows: { _array } }) => callback(_array)
        );
    });
}

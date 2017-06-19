import { SQLite } from 'expo';

export default db = SQLite.openDatabase({ name: 'db.leaf' });

export function fetchTransactions(callback) {
    db.transaction(tx => {
        tx.executeSql(
            `SELECT id, strftime('%Y-%m-%d', timestamp) AS date, name, category, amount FROM transactions
            ORDER BY timestamp DESC;`,
            [],
            (_, { rows: { _array } }) => callback(_array)
        );
    });
}

import { SQLite } from 'expo';

export default db = SQLite.openDatabase({ name: 'db.leaf' });

export function fetchTransactions(callback) {
    db.transaction(tx => {
        tx.executeSql(
            `SELECT id, strftime('%Y-%m-%d') AS date, name, category, amount FROM transactions
            ORDER BY date DESC;`,
            [],
            (_, { rows: { _array } }) => callback(_array)
        );
    });
}

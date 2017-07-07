import { SQLite } from 'expo';

export default db = SQLite.openDatabase({ name: 'db.leaf' });

export function dbinit() {
    db.transaction(tx => {
        tx.executeSql(
                `
                CREATE TABLE IF NOT EXISTS templates (
                    id INTEGER PRIMARY KEY NOT NULL,
                    template_name TEXT,
                    name TEXT,
                    category TEXT,
                    amount INT
                    );
                `
                );
    });
    db.transaction(tx => {
        tx.executeSql(
                `
                CREATE TABLE IF NOT EXISTS transactions (
                    id INTEGER PRIMARY KEY NOT NULL,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                    name TEXT,
                    category TEXT,
                    amount INT
                    );
                `
                );
    });
    db.transaction(tx => {
        tx.executeSql(
                `
                CREATE INDEX transactions_category_idx ON transactions (category);
                `
                );
    });
    db.transaction(tx => {
        tx.executeSql(
                `
                CREATE INDEX transactions_timestamp_idx ON transactions (timestamp);
                `
                );
    });
}

export function fetchTransactions(callback) {
    db.transaction(tx => {
        tx.executeSql(
            `SELECT id, strftime('%Y-%m-%d', timestamp) AS date, name, category, amount FROM transactions
            ORDER BY timestamp DESC;`,
            [],
            (_, { rows: { _array } }) => {
                const processed = _array.map(t => {
                    const utcDate = new Date(t.date);
                    t.date = new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());
                    return t;
                });
                return callback(processed);
            }
        );
    });
}

export function fetchTemplates(callback) {
    db.transaction(tx => {
        tx.executeSql(
            `SELECT id, template_name, name, category, amount FROM templates`,
            [],
            (_, { rows: { _array } }) => callback(_array)
        );
    });
}

import React from 'react';
import { View, StatusBar } from 'react-native';
import TransactionForm from './components/TransactionForm';
import db from './DB';

export default class App extends React.Component {
    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS transactions (
                        id INTEGER PRIMARY KEY NOT NULL,
                        name TEXT,
                        category TEXT,
                        amount INT
                        );`
                    );
        });
    }

    render() {
        return (
                <View style={{ flex: 1 }}>
                    <StatusBar hidden={true} />
                    <TransactionForm />
                </View>
                );
    }
}

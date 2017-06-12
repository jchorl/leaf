import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import db from './DB';

let store = createStore(reducers);

export default class App extends React.Component {
    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS transactions (
                    id INTEGER PRIMARY KEY NOT NULL,
                    name TEXT,
                    category TEXT,
                    amount INT
                );
                CREATE INDEX transactions_category_idx ON transactions (category);`
            );
        });
    }

    render() {
        return (
                <Provider store={ store }>
                    <View style={{ flex: 1 }}>
                        <StatusBar hidden={true} />
                        <TransactionForm />
                        <TransactionList />
                    </View>
                </Provider>
                );
    }
}

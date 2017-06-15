import React from 'react';
import { Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Exponent from 'expo';
import TransactionScreenNavigator from './components/TransactionScreenNavigator';
import TransactionForm from './components/TransactionForm';
import db from './DB';


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

export default StackNavigator({
    Home: {
        screen: TransactionScreenNavigator,
        navigationOptions: ({ navigation: { navigate } }) => ({
            title: 'LEAF',
            headerStyle: { marginTop: Exponent.Constants.statusBarHeight, paddingRight: 10 },
            headerRight: <Button title="New" onPress={ () => navigate('NewTransaction') } />
        })
    },
    NewTransaction: {
        screen: TransactionForm,
        navigationOptions: {
            title: 'Create Transaction',
            headerStyle: { marginTop: Exponent.Constants.statusBarHeight }
        }
    },
    EditTransaction: {
        screen: TransactionForm,
        navigationOptions: {
            title: 'Edit Transaction',
            headerStyle: { marginTop: Exponent.Constants.statusBarHeight }
        }
    }
});

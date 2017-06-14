import React from 'react';
import { View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Exponent from 'expo';
import TransactionScreenNavigator from './components/TransactionScreenNavigator';
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
        navigationOptions: {
            title: 'LEAF',
            headerStyle: { marginTop: Exponent.Constants.statusBarHeight, paddingRight: 10 }
        }
    }
});

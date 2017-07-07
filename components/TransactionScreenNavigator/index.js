import React from 'react';
import { Text } from 'react-native';
import { TabNavigator } from "react-navigation";
import TransactionList from '../TransactionList';
import Reports from '../Reports';

export default TabNavigator({
    Transactions: {
        screen: TransactionList,
        navigationOptions: {
            title: 'Transactions'
        }
    },
    Reports: {
        screen: Reports,
        navigationOptions: {
            title: 'Reports'
        }
    }
});

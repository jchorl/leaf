import React from 'react';
import { Text } from 'react-native';
import { TabNavigator } from "react-navigation";
import TransactionList from '../TransactionList';
import Graphs from '../Graphs';

export default TabNavigator({
    Transactions: {
        screen: TransactionList,
        navigationOptions: {
            title: 'Transactions'
        }
    },
    Graphs: {
        screen: Graphs,
        navigationOptions: {
            title: 'Graphs'
        }
    }
});

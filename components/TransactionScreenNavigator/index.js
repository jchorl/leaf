import React from 'react';
import { Text } from 'react-native';
import { TabNavigator } from "react-navigation";
import Exponent from 'expo';
import TransactionList from '../TransactionList';

class TransactionGraphsScreen extends React.Component {
    static navigationOptions = {
        title: 'Graphs'
    }

    render() {
        return <Text>Transaction graphs.</Text>;
    }
}

const tabNav = TabNavigator({
    Transactions: { screen: TransactionList },
    Graphs: { screen: TransactionGraphsScreen }
});

tabNav.navigationOptions = {
    title: 'LEAF',
    headerStyle: { marginTop: Exponent.Constants.statusBarHeight }
};

export default tabNav;

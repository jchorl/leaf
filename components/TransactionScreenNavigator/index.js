import React from 'react';
import { Text } from 'react-native';
import { TabNavigator } from "react-navigation";
import TransactionList from '../TransactionList';

class TransactionGraphsScreen extends React.Component {
    static navigationOptions = {
        title: 'Graphs'
    }

    render() {
        return <Text>Transaction graphs.</Text>;
    }
}

export default TabNavigator({
    Transactions: { screen: TransactionList },
    Graphs: { screen: TransactionGraphsScreen }
});

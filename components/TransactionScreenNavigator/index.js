import React from 'react';
import { Text } from 'react-native';
import { TabNavigator } from "react-navigation";
import TransactionList from '../TransactionList';

class TransactionListScreen extends React.Component {
  render() {
    return <TransactionList />;
  }
}

class TransactionGraphsScreen extends React.Component {
  render() {
    return <Text>Transaction graphs.</Text>;
  }
}

export const TransactionScreenNavigator = TabNavigator({
  Transactions: { screen: TransactionListScreen },
  Graphs: { screen: TransactionGraphsScreen }
});

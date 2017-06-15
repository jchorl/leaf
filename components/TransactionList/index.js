import React from 'react';
import {
    StyleSheet,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';
import PropTypes from 'prop-types';
import Exponent from 'expo';
import { TRANSACTIONS_UPDATED_EVENT } from '../../constants';
import { fetchTransactions } from '../../DB';
import Transaction from '../Transaction';

export default class TransactionList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: []
        };
    }

    componentWillMount() {
        fetchTransactions(transactions => this.setState({ transactions }));
        DeviceEventEmitter.addListener(TRANSACTIONS_UPDATED_EVENT, this.fetchTransactions);
    }

    render() {
        const { transactions } = this.state;
        return (
                <ScrollView style={styles.container}>
                    { transactions.map(t => <Transaction key={ t.id } transaction={ t } />) }
                </ScrollView>
                );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

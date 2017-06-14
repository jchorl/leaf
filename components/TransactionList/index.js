import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Exponent from 'expo';
import db from '../../DB';
import Transaction from '../Transaction';

export default class TransactionList extends React.Component {
    static navigationOptions = {
        title: 'Transactions',
        headerStyle: { marginTop: Exponent.Constants.statusBarHeight }
    }

    constructor(props) {
        super(props);

        this.state = {
            transactions: []
        };
    }

    fetchTransactions = () => {
        db.transaction(tx => {
            tx.executeSql(
                    `select * from transactions;`,
                    [],
                    (_, { rows: { _array } }) => this.setState({ transactions: _array })
                    );
        });
    }

    componentWillMount() {
        this.fetchTransactions();
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

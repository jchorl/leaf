import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import db from '../../DB';
import Transaction from '../Transaction';

class TransactionList extends React.Component {
    static propTypes = {
        transactions: PropTypes.object.isRequired
    };

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.transactions.updated !== this.props.transactions.updated) {
            this.fetchTransactions();
        }
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

export default connect(state => {
    return {
        transactions: state.transactions
    };
})(TransactionList);

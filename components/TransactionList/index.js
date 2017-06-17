import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Exponent from 'expo';
import { connect } from 'react-redux';

import { fetchTransactions } from '../../DB';
import Transaction from '../Transaction';

class TransactionList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: []
        };
    }

    componentWillMount() {
        fetchTransactions(transactions => this.setState({ transactions }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updateCounter !== this.props.updateCounter) {
            fetchTransactions(transactions => this.setState({ transactions }));
        }
    }

    edit = transaction => () => {
        const { navigation } = this.props;
        navigation.navigate('EditTransaction', { transaction });
    }

    render() {
        const { transactions } = this.state;
        return (
            <ScrollView style={styles.container}>
                { transactions.map(t => <Transaction key={ t.id } transaction={ t } goToEdit={ this.edit(t) } />) }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default connect(state => ({ updateCounter: state.updateCounter }))(TransactionList);

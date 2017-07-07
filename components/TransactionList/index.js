import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchTransactions } from '../../DB';
import Transaction from '../Transaction';
import TemplateBar from '../TemplateBar';

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

    renderTransactions(transactions) {
        var groupedByDate = _.groupBy(transactions, 'date');
        var renderedGroups = Object.keys(groupedByDate).map(date => this.renderGroup(date, groupedByDate[date]));

        return renderedGroups;
    }

    renderGroup(date, group) {
        return (
            group.map(t => <Transaction key={ t.id } transaction = { t } goToEdit={ this.edit(t) } />)
        );
    }

    render() {
        const { transactions } = this.state;
        const { navigation } = this.props;

        return (
            <ScrollView style={styles.container}>
                <TemplateBar navigation={ navigation } />
                { this.renderTransactions(transactions) }
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

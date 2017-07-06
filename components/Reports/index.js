import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { amountToString } from '../../util';
import { fetchTransactions } from '../../DB';

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class TransactionList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    populateState = transactions => {
        const transactionsByYear = _.groupBy(transactions, t => t.date.getFullYear());
        let transactionsByMonthByYear = {};
        for (let year of Object.keys(transactionsByYear)) {
            transactionsByMonthByYear[parseInt(year)] = _.sortBy(
                    _.map(
                        _.groupBy(transactionsByYear[year], t => t.date.getMonth()),
                        (transactions, month) => ({
                            month: parseInt(month),
                            transactions,
                            total: _.sumBy(transactions, 'amount')
                        })
                        ),
                    'month'
                    ).reverse();
        }
        const sortedYears = _.sortBy(Object.keys(transactionsByMonthByYear)).reverse();
        const data = [];
        for (let year of sortedYears) {
            data.push({
                year,
                data: transactionsByMonthByYear[year]
            });
        }
        this.setState({ data });
    }

    goToReport = (label, transactions) => () => {
        const { navigation } = this.props;
        navigation.navigate('Report', { label, transactions });
    }

    getOrderedYearMonthPairs = () => {
        let pairs = [];
        for (let yearAndData of this.state.data) {
            for (let data of yearAndData.data) {
                pairs.push({
                    year: yearAndData.year,
                    month: MONTH_NAMES[data.month],
                    transactions: data.transactions,
                    total: data.total
                });
            }
        }

        return pairs;
    }

    componentWillMount() {
        fetchTransactions(transactions => this.populateState(transactions));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updateCounter !== this.props.updateCounter) {
            fetchTransactions(transactions => this.populateState(transactions));
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                { this.getOrderedYearMonthPairs().map(a => (
                <TouchableOpacity key={ `${a.month},${a.year}` } style={ styles.reportRow } onPress={ this.goToReport(a.month + ', ' + a.year, a.transactions) }>
                    <Text style={styles.biggerText}>{ `${a.month}, ${a.year}` }</Text>
                    <Text style={styles.biggerText}>{ amountToString(a.total) }</Text>
                </TouchableOpacity>
                )) }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reportRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        marginVertical: 5,
    },
    biggerText: {
        fontSize: 18,
    },
});

export default connect(state => ({ updateCounter: state.updateCounter }))(TransactionList);

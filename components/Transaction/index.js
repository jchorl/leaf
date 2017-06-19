import Moment from 'moment';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { amountToString } from '../../util';

export default class Transaction extends React.Component {
    static propTypes = {
        transaction: PropTypes.shape({
            name: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired
        }),
        goToEdit: PropTypes.func.isRequired
    }

    render() {
        const {
            transaction: { name, category, amount, date },
            goToEdit
        } = this.props;

        Moment.locale('en');

        console.log(date);
        return (
            <TouchableOpacity style={ styles.container } onPress={ goToEdit }>
                <View style={ styles.nameCategoryColumn }>
                    <Text style={ styles.field }>{ name }</Text>
                    <Text style={ styles.category }>{ category }</Text>
                </View>
                <View style={ styles.priceColumn }>
                    <Text style={ styles.field }>{ amountToString(amount) }</Text>
                    <Text style={ styles.category }>{ date }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        padding: 10,
    },
    nameCategoryColumn: {
        flex: 0.5
    },
    priceColumn: {
        flex: 0.5,
        alignItems: 'flex-end'
    },
    field: {
        flex: 0.33,
        fontSize: 18
    },
    category: {
        flex: 0.33,
        fontSize: 14,
        color: 'gray'
    }
});

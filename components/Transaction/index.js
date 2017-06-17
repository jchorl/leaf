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
            amount: PropTypes.number.isRequired
        }),
        goToEdit: PropTypes.func.isRequired
    }

    render() {
        const {
            transaction: { timestamp, name, category, amount },
            goToEdit
        } = this.props;

        Moment.locale('en');

        return (
            <TouchableOpacity style={ styles.container } onPress={ goToEdit }>
                <View style={ styles.timestampColumn }>
                    <Text style={ styles.field }>{ Moment(timestamp).format('YYYY/MM/DD') }</Text>
                </View>
                <View style={ styles.nameCategoryColumn }>
                    <Text style={ styles.field }>{ name }</Text>
                    <Text style={ styles.field }>{ category }</Text>
                </View>
                <View style={ styles.priceColumn }>
                    <Text style={ styles.field }>{ amountToString(amount) }</Text>
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
        padding: 20,
    },
    timestampColumn: {
        flex: 0.5
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
    }
});

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { amountToString } from '../../util';

export default class Transaction extends React.Component {
    static propTypes = {
        transaction: PropTypes.shape({
            name: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired
        })
    }

    render() {
        const { transaction: { name, category, amount } } = this.props;

        return (
                <View style={ styles.container }>
                    <View style={ styles.nameCategoryColumn }>
                        <Text style={ styles.field }>{ name }</Text>
                        <Text style={ styles.field }>{ category }</Text>
                    </View>
                    <View style={ styles.priceColumn }>
                        <Text style={ styles.field }>{ amountToString(amount) }</Text>
                    </View>
                </View>
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

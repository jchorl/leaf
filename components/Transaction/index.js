import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { amountToString } from '../../util';

export default class Transaction extends React.Component {
    render() {
        const {
            transaction: { name, category, amount, date },
            goToEdit
        } = this.props;

        return (
            <TouchableOpacity style={ styles.container } onPress={ goToEdit }>
                <View style={ styles.nameCategoryColumn }>
                    <Text style={ styles.field }>{ name }</Text>
                    <Text style={ styles.category }>{ category }</Text>
                </View>
                <View style={ styles.priceColumn }>
                    <Text style={ styles.field }>{ amountToString(amount) }</Text>
                    <Text style={ styles.category }>{ date.toLocaleDateString() }</Text>
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

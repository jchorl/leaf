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
                <View style={ styles.row }>
                    <Text style={ [styles.main, styles.long] }>{ name }</Text>
                    <View style={ styles.short }>
                        <Text style={ styles.main }>{ amountToString(amount) }</Text>
                    </View>
                </View>
                <View style={ styles.row }>
                    <Text style={ [styles.sub, styles.long] }>{ date.toLocaleDateString() }</Text>
                    <View style={ styles.short }>
                        <Text style={ styles.sub }>{ category }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    main: {
        fontSize: 18,
    },
    sub: {
        fontSize: 14,
        color: 'gray'
    },
    long: {
        flex: 3,
        paddingRight: 20,
    },
    short: {
        flex: 1,
        alignItems: 'flex-end',
    },
});

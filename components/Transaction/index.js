import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

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
                <View style={styles.container}>
                    <Text>Name: { name }</Text>
                    <Text>Category: { category }</Text>
                    <Text>Amount: { amount / 100.0 }</Text>
                </View>
                );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

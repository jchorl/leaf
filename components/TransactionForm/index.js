import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    TextInput,
    DeviceEventEmitter
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { TRANSACTIONS_UPDATED_EVENT } from '../../constants';
import db from '../../DB';

export default class TransactionForm extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            category: '',
            amount: ''
        }
    }

    closeForm = () => {
        const { navigation: { goBack } } = this.props;
        DeviceEventEmitter.emit(TRANSACTIONS_UPDATED_EVENT, {});
        goBack();
    }

    onSubmit = () => {
        const {
            name,
            category,
            amount
        } = this.state;

        // only store in cents
        const amountCents = amount * 100;
        db.transaction(
            tx => tx.executeSql('insert into transactions (name, category, amount) values (?, ?, ?)', [name, category, amountCents]),
            null,
            this.closeForm
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>Name: </Text>
                    <TextInput
                        onChangeText={ name => this.setState({ name }) }
                        value={ this.state.name }
                        defaultValue="Meat"
                        returnKeyType="next"
                    />
                </View>
                <View>
                    <Text>Category: </Text>
                    <TextInput
                        onChangeText={ category => this.setState({ category }) }
                        value={ this.state.category }
                        defaultValue="Groceries"
                        returnKeyType="next"
                    />
                </View>
                <View>
                    <Text>Amount: </Text>
                    <TextInput
                        onChangeText={ amount => this.setState({ amount }) }
                        value={ this.state.amount }
                        defaultValue="1.50"
                        keyboardType="numeric"
                        returnKeyType="send"
                    />
                </View>
                <Button onPress={ this.onSubmit } title="Create" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

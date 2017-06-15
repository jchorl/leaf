import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { transactionsUpdated } from '../../actions';
import db from '../../DB';

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        console.log('logging params');
        const state = {
            name: '',
            category: '',
            amount: ''
        }

        const params = navigation.state.params;
        if (params) {
            state.id = params.transaction.id;
            state.name = params.transaction.name;
            state.category = params.transaction.category;
            state.amount = (params.transaction.amount / 100.0) + '';
        }

        this.state = state;
    }

    closeForm = () => {
        const { dispatch, navigation: { goBack } } = this.props;
        dispatch(transactionsUpdated());
        goBack();
    }

    onSubmit = () => {
        const {
            id,
            name,
            category,
            amount
        } = this.state;

        // only store in cents
        const amountCents = amount * 100;
        if (!id) {
            db.transaction(
                tx => tx.executeSql('insert into transactions (name, category, amount) values (?, ?, ?)', [name, category, amountCents]),
                null,
                this.closeForm
            );
        } else {
            db.transaction(
                tx => tx.executeSql('update transactions set name=?, category=?, amount=? where id=?', [name, category, amountCents, id]),
                null,
                this.closeForm
            );
        }
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
                <Button onPress={ this.onSubmit } title={ this.state.id ? 'Update' : 'Create' } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default connect()(TransactionForm);

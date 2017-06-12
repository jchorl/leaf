import React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { transactionsUpdated } from '../../actions';
import db from '../../DB';

class TransactionForm extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    constructor() {
        super();
        this.state = {
            name: '',
            category: '',
            amount: ''
        }
    }

    update = () => {
        const { dispatch } = this.props;

        dispatch(transactionsUpdated());
    }

    onSubmit = () => {
        const {
            name,
            category,
            amount
        } = this.state;

        // only store in cents
        const amountCents = amount * 100;
        console.log(`Submitting form with values ${name}, ${category}, ${amountCents}`);
        db.transaction(
            tx => tx.executeSql('insert into transactions (name, category, amount) values (?, ?, ?)', [name, category, amountCents]),
            null,
            this.update
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

export default connect()(TransactionForm);

import React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
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

    update = () => {
        console.log('update called');
        db.transaction(tx => {
            tx.executeSql(
                    `select * from transactions;`,
                    [],
                    (_, { rows: { _array } }) => console.log(_array)
                    );
        });
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

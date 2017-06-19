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
import DatePicker from 'react-native-datepicker';
import { transactionsUpdated } from '../../actions';
import db from '../../DB';

function parseDate(input) {
    let parts = input.split('-');
    return new Date(parts[0], parts[1]-1, parts[2]);
}

function dateString(date) {
    return date.getFullYear() + '-'
        + ('0' + (date.getMonth()+1)).slice(-2) + '-'
        + ('0' + date.getDate()).slice(-2);
}

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const state = {
            name: '',
            category: '',
            amount: '',
            date: dateString(new Date())
        }

        const params = navigation.state.params;
        if (params) {
            state.id = params.transaction.id;
            state.name = params.transaction.name;
            state.category = params.transaction.category;
            state.amount = (params.transaction.amount / 100.0) + '';
            state.date = parseDate(params.transaction.date);
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
            amount,
            date
        } = this.state;

        // only store in cents
        const amountCents = amount * 100;
        if (!id) {
            db.transaction(
                    tx => tx.executeSql('insert into transactions (name, category, amount, timestamp) values (?, ?, ?, ?)', [name, category, amountCents, date + ' 00:00:00']),
                    null,
                    this.closeForm
                    );
        } else {
            db.transaction(
                    tx => tx.executeSql('update transactions set name=?, category=?, amount=?, timestamp=? where id=?', [name, category, amountCents, date + ' 00:00:00', id]),
                    null,
                    this.closeForm
                    );
        }
    }

    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.inputField}>
                        <Text>Name: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={ name => this.setState({ name }) }
                            value={ this.state.name }
                            defaultValue="Meat"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.inputField}>
                        <Text>Category: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={ category => this.setState({ category }) }
                            value={ this.state.category }
                            defaultValue="Groceries"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.inputField}>
                        <Text>Amount: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={ amount => this.setState({ amount }) }
                            value={ this.state.amount }
                            defaultValue="1.50"
                            keyboardType="numeric"
                            returnKeyType="send"
                        />
                    </View>
                    <View style={styles.inputField}>
                        <Text>Date: </Text>
                        <DatePicker
                            style={{width: 300, marginTop: 20, marginBottom: 20}}
                            date={this.state.date}
                            mode="date"
                            placeholder="Select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                display: 'none',
                            }
                            }}
                            onDateChange={(date) => {this.setState({date})}}
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
        padding: 20,
    },
    inputField: {
        marginTop: 5,
        marginBottom: 30,
    },
    input: {
        padding: 10,
    },
});

export default connect()(TransactionForm);

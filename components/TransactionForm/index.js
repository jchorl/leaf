import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setBarcodeInfo, transactionsUpdated } from '../../actions';
import db from '../../DB';

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
            state.date = params.transaction.date;
        }

        this.state = state;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.barcodeInfo.name !== this.props.barcodeInfo.name && nextProps.barcodeInfo.name) {
            const nextState = {
                name: nextProps.barcodeInfo.name
            }
            if (nextProps.barcodeInfo.amount) {
                nextState.amount = nextProps.barcodeInfo.amount / 100.0 + '';
            }
            if (nextProps.barcodeInfo.category) {
                nextState.category = nextProps.barcodeInfo.category;
            }
            this.setState(nextState);
        }
    }

    closeForm = () => {
        const { dispatch, navigation: { goBack } } = this.props;
        dispatch(transactionsUpdated());
        goBack();
    }

    createTemplate = () => {
        const { navigation } = this.props;
        navigation.navigate('NewTemplate', {
            transaction: navigation.state.params.transaction,
            formKey: navigation.state.key
        });
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

    scanBarcode = () => {
        const { dispatch, navigation } = this.props;
        dispatch(setBarcodeInfo({}));
        navigation.navigate('ScanBarcode');
    }

    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.nameInputFieldAndBarcodeIcon}>
                        <View style={[styles.inputField, styles.nameInputField]}>
                            <Text>Name: </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={ name => this.setState({ name }) }
                                value={ this.state.name }
                                defaultValue="Meat"
                                returnKeyType="next"
                            />
                        </View>
                        { this.state.id ? (
                            null
                        ) : (
                            <TouchableOpacity style={styles.barcodeIconView} onPress={this.scanBarcode}>
                                <MaterialCommunityIcons name="barcode-scan" size={50}/>
                            </TouchableOpacity>
                        ) }
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
                    { this.state.id ? (
                    <View style={styles.templateButton}>
                        <Button onPress={ this.createTemplate } title="Create Template" />
                    </View>
                    ) : (
                    null
                    ) }
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
    nameInputFieldAndBarcodeIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameInputField: {
        flex: 4,
    },
    barcodeIconView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    templateButton: {
        marginBottom: 20,
    },
});

export default connect(state => ({ barcodeInfo: state.barcodeInfo }))(TransactionForm);

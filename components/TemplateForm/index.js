import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { templatesUpdated } from '../../actions';
import db from '../../DB';

class TemplateForm extends React.Component {
    constructor(props) {
        super(props);
        const transaction = this.props.navigation.state.params.transaction;
        this.state = {
            templateName: '',
            name: transaction.name,
            category: transaction.category,
            amount: (transaction.amount / 100.0) + ''
        };
    }

    closeForm = () => {
        const { dispatch, navigation: { goBack, state: { params: { formKey } } } } = this.props;
        dispatch(templatesUpdated());
        goBack(formKey);
    }

    onSubmit = () => {
        const {
            templateName,
            name,
            category,
            amount,
        } = this.state;

        const amountCents = amount * 100;
        db.transaction(
                tx => tx.executeSql('insert into templates (template_name, name, category, amount) values (?, ?, ?, ?)', [templateName, name, category, amountCents]),
                err => console.error(err),
                this.closeForm
                );
    }

    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.inputField}>
                        <Text>Template Name: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={ templateName => this.setState({ templateName }) }
                            value={ this.state.templateName }
                            defaultValue="Groceries"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.inputField}>
                        <Text>Transaction Name: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={ name => this.setState({ name }) }
                            value={ this.state.name }
                            defaultValue="Wal-Mart"
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
                    <Button onPress={ this.onSubmit } title="Create" />
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

export default connect()(TemplateForm);

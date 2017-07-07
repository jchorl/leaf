import React from 'react';
import { Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Exponent from 'expo';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import Report from './components/Report';
import TransactionScreenNavigator from './components/TransactionScreenNavigator';
import TransactionForm from './components/TransactionForm';
import TemplateForm from './components/TemplateForm';
import BarcodeScanner from './components/BarcodeScanner';
import { dbinit } from './DB';


dbinit();

const AppNavigator = StackNavigator({
    Home: {
        screen: TransactionScreenNavigator,
        navigationOptions: ({ navigation: { navigate } }) => ({
            title: 'LEAF',
            headerStyle: { marginTop: Exponent.Constants.statusBarHeight, paddingRight: 10 },
            headerRight: <Button title="New" onPress={ () => navigate('NewTransaction') } />
        })
    },
    NewTransaction: {
        screen: TransactionForm,
        navigationOptions: {
            title: 'Create Transaction',
            headerStyle: { marginTop: Exponent.Constants.statusBarHeight }
        }
    },
    EditTransaction: {
        screen: TransactionForm,
        navigationOptions: {
            title: 'Edit Transaction',
            headerStyle: { marginTop: Exponent.Constants.statusBarHeight }
        }
    },
    NewTemplate: {
        screen: TemplateForm,
        navigationOptions: {
            title: 'Create Template',
            headerStyle: { marginTop: Exponent.Constants.statusBarHeight }
        }
    },
    ScanBarcode: {
        screen: BarcodeScanner,
        navigationOptions: {
            title: 'Scan barcode',
            headerStyle: { marginTop: Exponent.Constants.statusBarHeight }
        }
    },
    Report: {
        screen: Report,
        navigationOptions: {
            headerStyle: { marginTop: Exponent.Constants.statusBarHeight }
        }
    },
});

const store = createStore(reducer);

export default class App extends React.Component {
    render() {
        return (
                <Provider store={store}>
                    <AppNavigator />
                </Provider>
               );
    }
}

import React from 'react';
import {
    Text,
    DeviceEventEmitter
} from 'react-native';
import { fetchTransactions } from '../../DB';
import { TRANSACTIONS_UPDATED_EVENT } from '../../constants';

export default class Graphs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: []
        };
    }

    componentWillMount() {
        fetchTransactions(transactions => this.setState({ transactions }));
        DeviceEventEmitter.addListener(TRANSACTIONS_UPDATED_EVENT, this.fetchTransactions);
    }

    render() {
        return <Text>Transaction graphs here</Text>;
    }
}

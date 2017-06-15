import React from 'react';
import {
    View,
    DeviceEventEmitter
} from 'react-native';
import { Pie } from 'react-native-pathjs-charts';
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
        // TODO: we have all the transactions stored in this.state.transactions. let's process that data and show useful things on the graph
        const { transactions } = this.state;
        console.log(transactions);

        let data = [{
            "name": "Washington",
            "population": 7694980
        }, {
            "name": "Oregon",
            "population": 2584160
        }, {
            "name": "Minnesota",
            "population": 6590667
        }, {
            "name": "Alaska",
            "population": 7284698
        }]

        let options = {
            margin: {
                top: 20,
                left: 20,
                right: 20,
                bottom: 20
            },
            width: 350,
            height: 350,
            color: '#2980B9',
            r: 50,
            R: 150,
            legendPosition: 'topLeft',
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                color: '#ECF0F1'
            }
        }

        return (
                <View>
                <Pie
                    data={data}
                    options={options}
                    accessorKey="population" />
                </View>
               );
    }
}

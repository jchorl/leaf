import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pie } from 'react-native-pathjs-charts';
import { connect } from 'react-redux';
import { fetchTransactions } from '../../DB';

class Graphs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: []
        };
    }

    componentWillMount() {
        fetchTransactions(transactions => this.setState({ transactions }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updateCounter !== this.props.updateCounter) {
            fetchTransactions(transactions => this.setState({ transactions }));
        }
    }

    render() {
        // TODO: we have all the transactions stored in this.state.transactions. let's process that data and show useful things on the graph
        const { transactions } = this.state;
        // console.log(transactions);

        let data = {}
        for (let transaction of transactions) {
          let category = transaction.category;
          if (!data.hasOwnProperty(category)) {
            data[category] = {"name": category, "total_amount": transaction.amount};
          } else {
            data[category].amount += transaction.amount;
          }
        }

        data = Object.keys(data).map(key => data[key]); // data = [{ 'name': 'category', 'total_amount': total_amount }]

        let options = {
            margin: {
                top: 20,
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
                fontSize: 10,
                fontWeight: true,
                color: '#ECF0F1'
            }
        }

        return (
            <View style={styles.content}>
                <Text>Spending Distribution</Text>
                <View>
                    <Pie
                        data={data}
                        options={options}
                        accessorKey="total_amount" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        flex: 1,
    },
})

export default connect(state => ({ updateCounter: state.updateCounter }))(Graphs);

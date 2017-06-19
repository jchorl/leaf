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
        const { transactions } = this.state;

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
                {
                data.length !== 0
                ? <Text style={styles.graphTitle}>Spending by Category</Text>
                : <Text>Please enter transactions to see categorized spending</Text>
                }
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
    graphTitle: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
    },
})

export default connect(state => ({ updateCounter: state.updateCounter }))(Graphs);

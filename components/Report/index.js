import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Bar, Pie } from 'react-native-pathjs-charts';
import _ from 'lodash';
import { fetchTransactions } from '../../DB';

function computeCategoryData(transactions) {
    let categoryData = {}
    for (let transaction of transactions) {
        let category = transaction.category;
        if (!categoryData.hasOwnProperty(category)) {
            categoryData[category] = {"name": category, "total_amount": 0};
        }
        categoryData[category].total_amount += transaction.amount;
    }

    return Object.keys(categoryData).map(key => categoryData[key]); // categoryData = [{ 'name': 'category', 'total_amount': total_amount }]
}

export default class Report extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Report for ${navigation.state.params.label}`,
    });

    render() {
        const { transactions, lastMonthTransactions, month, prevMonth } = this.props.navigation.state.params;
        const categoryData = computeCategoryData(transactions);

        let monthOverMonth;
        if (lastMonthTransactions) {
            monthOverMonth = [[], []];
            prevCategoryData = computeCategoryData(lastMonthTransactions);
            let groupedByCategory = _.groupBy(categoryData, 'name');
            let prevGroupedByCategory = _.groupBy(prevCategoryData, 'name');
            for (let cat of Object.keys(groupedByCategory)) {
                monthOverMonth[0].push({
                    name: cat + ' (' + month + ')',
                    total_amount: groupedByCategory[cat][0].total_amount / 100
                });
                if (cat in prevGroupedByCategory) {
                    monthOverMonth[1].push({
                        name: cat + ' (' + prevMonth + ')',
                        total_amount: prevGroupedByCategory[cat][0].total_amount / 100
                    });
                } else {
                    monthOverMonth[1].push({ 'name': cat + ' (' + prevMonth + ')', 'total_amount': 0 });
                }
            }
            for (let cat of Object.keys(prevGroupedByCategory)) {
                if (cat in groupedByCategory) {
                    continue;
                }
                monthOverMonth[0].push({ 'name': cat + ' (' + month + ')', 'total_amount': 0 });
                monthOverMonth[1].push({
                    name: cat + ' (' + prevMonth + ')',
                    total_amount: prevGroupedByCategory[cat][0].total_amount / 100
                });
            }
            monthOverMonth[0] = _.sortBy(monthOverMonth[0], 'name')
            monthOverMonth[1] = _.sortBy(monthOverMonth[1], 'name')
        }

        let categoryOptions = {
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

        let monthOverMonthOptions = {
            width: 300,
            height: 300,
            margin: {
                top: 20,
                left: 25,
                bottom: 50,
                right: 20
            },
            color: '#2980B9',
            gutter: 20,
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        }

        return (
            <ScrollView style={styles.content}>
                <View style={styles.center}>
                    <Text style={styles.graphTitle}>Spending by Category</Text>
                    <View>
                        <Pie
                            data={categoryData}
                            options={categoryOptions}
                            accessorKey="total_amount" />
                    </View>
                </View>
                {
                monthOverMonth
                ? (
                <View style={styles.center}>
                    <Text style={styles.graphTitle}>Spending by Category</Text>
                    <View>
                        <Bar
                            data={monthOverMonth}
                            options={monthOverMonthOptions}
                            accessorKey="total_amount" />
                    </View>
                </View>
                )
                : null
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    center: {
        flex: 1,
        alignItems: 'center',
    },
    graphTitle: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
    },
})

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class TemplateBar extends React.Component {
    selectTemplate = template => () => {
        const { navigation } = this.props;
        const transaction = {
            name: template.name,
            category: template.category,
            amount: template.amount
        };
        navigation.navigate('NewTransaction', { transaction });
    }

    render() {
        const { template } = this.props;

        return (
                <TouchableOpacity style={ styles.templateBox } onPress={ this.selectTemplate(template) } >
                    <Text>{ template.template_name }</Text>
                </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    templateBox: {
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        margin: 10,
    },
});

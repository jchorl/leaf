import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Exponent from 'expo';
import { connect } from 'react-redux';
import { fetchTemplates } from '../../DB';
import Template from './Template';

class TemplateBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            templates: []
        };
    }

    componentWillMount() {
        fetchTemplates(templates => this.setState({ templates }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.templateUpdateCounter !== this.props.templateUpdateCounter) {
            fetchTemplates(templates => this.setState({ templates }));
        }
    }

    render() {
        const { templates } = this.state;
        const { navigation } = this.props;

        return templates.length ? (
            <View style={styles.container}>
                <Text style={styles.newFromTemplate}>New from template...</Text>
                <ScrollView horizontal={ true } style={styles.container}>
                    { templates.map(t => <Template key={ t.id } template={ t } navigation={ navigation } />) }
                </ScrollView>
            </View>
        ): null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    newFromTemplate: {
        fontSize: 16,
    },
});

export default connect(state => ({ templateUpdateCounter: state.templateUpdateCounter }))(TemplateBar);

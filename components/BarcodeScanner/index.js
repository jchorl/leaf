import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo, { BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
import XMLParser from 'react-xml-parser';
import { setBarcodeInfo } from '../../actions';

class BarcodeScanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
        }
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                    <View style={{flex: 1}}>
                        <BarCodeScanner
                            onBarCodeRead={this._handleBarCodeRead}
                            style={StyleSheet.absoluteFill}
                        />
                    </View>
                    );
        }
    }

    _handleBarCodeRead = data => {
        const { dispatch, navigation } = this.props;
        fetch(`https://us-central1-leafrelay.cloudfunctions.net/leafrelay?id=${data.data}`)
            .then(resp => resp.json())
            .then(parsed => {
                if (parsed.title) {
                    dispatch(setBarcodeInfo({name: parsed.title, amount: parsed.amount, category: parsed.category}));
                } else {
                    alert('The barcode was read successfully but the product could not be found');
                }
                navigation.goBack();
            });
    }
}

export default connect()(BarcodeScanner);

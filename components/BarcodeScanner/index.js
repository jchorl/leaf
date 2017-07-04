import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo, { BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import XMLParser from 'react-xml-parser';
import { setBarcodeInfo } from '../../actions';
import { AWS_KEY_ID, AWS_SECRET } from '../../credentials';

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
        const host = 'http://webservices.amazon.com/onca/xml';
        const idType = 'EAN';
        const itemId = data.data;
        const queryString = `Service=AWSECommerceService&AWSAccessKeyId=${AWS_KEY_ID}&AssociateTag=joshchorlton-20&Operation=ItemLookup&SearchIndex=All&IdType=${idType}&ItemId=${itemId}&ResponseGroup=Offers,ItemAttributes&Timestamp=${(new Date()).toISOString()}`.replace(/,/g, '%2C').replace(/:/g, '%3A');
        const split = queryString.split('&');
        split.sort();
        const sortedQueryString = split.join('&');
        const stringToSign = 'GET\nwebservices.amazon.com\n/onca/xml\n' + sortedQueryString;
        const signature = Base64.stringify(HmacSHA256(stringToSign, AWS_SECRET)).replace(/\+/g, '%2B').replace(/=/g, '%3D');
        const url = host + '?' + sortedQueryString + '&Signature=' + signature;
        fetch(url)
            .then(resp => resp.text())
            .then(text => {
                const parsed = new XMLParser().parseFromString(text);
                const els = parsed.getElementsByTagName('Title');
                const lowestNewPrice = parsed.getElementsByTagName('LowestNewPrice');
                if (els.length) {
                    const cats = parsed.getElementsByTagName('ProductGroup');
                    let amount, category;
                    if (lowestNewPrice.length
                            && lowestNewPrice[0].children
                            && lowestNewPrice[0].children.length) {
                        for (let child of lowestNewPrice[0].children) {
                            if (child.name === 'Amount') {
                                amount = parseInt(child.value);
                                break;
                            }
                        }
                    }
                    if (cats.length) {
                        category = cats[0].value;
                    }
                    dispatch(setBarcodeInfo({name: els[0].value, amount, category}));
                } else {
                    alert('The barcode was read successfully but the product could not be found');
                }
                navigation.goBack();
            });
    }
}

export default connect()(BarcodeScanner);

const HmacSHA256 = require('crypto-js/hmac-sha256');
const Base64 = require('crypto-js/enc-base64');
const fetch = require('node-fetch');
const parseString = require('xml2js').parseString;
const credentials = require('./credentials');

exports.leafrelay = function leafrelay(req, res) {
    const host = 'http://webservices.amazon.com/onca/xml';
    const idType = 'EAN';
    const itemId = req.query.id;
    const queryString = `Service=AWSECommerceService&AWSAccessKeyId=${credentials.AWS_KEY_ID}&AssociateTag=joshchorlton-20&Operation=ItemLookup&SearchIndex=All&IdType=${idType}&ItemId=${itemId}&ResponseGroup=Offers,ItemAttributes&Timestamp=${(new Date()).toISOString()}`.replace(/,/g, '%2C').replace(/:/g, '%3A');
    const split = queryString.split('&');
    split.sort();
    const sortedQueryString = split.join('&');
    const stringToSign = 'GET\nwebservices.amazon.com\n/onca/xml\n' + sortedQueryString;
    const signature = Base64.stringify(HmacSHA256(stringToSign, credentials.AWS_SECRET)).replace(/\+/g, '%2B').replace(/=/g, '%3D');
    const url = host + '?' + sortedQueryString + '&Signature=' + signature;
    return fetch(url)
        .then(resp => resp.text())
        .then(text => {
            parseString(text, (err, result) => {
                let title;
                let amount;
                let category;
                try {
                    title = result.ItemLookupResponse.Items[0].Item[0].ItemAttributes[0].Title[0];
                } catch (e) {}
                try {
                    amount = result.ItemLookupResponse.Items[0].Item[0].OfferSummary[0].LowestNewPrice[0].Amount[0];
                } catch (e) {}
                try {
                    category = result.ItemLookupResponse.Items[0].Item[0].ItemAttributes[0].ProductGroup[0];
                } catch (e) {}
                res.send({ title, amount, category });
            });
        });
};

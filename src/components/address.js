// const axios = require('axios').default
import axios from 'axios'
// const xmlbuilder2 = require('xmlbuilder2')
import xmlbuilder2 from 'xmlbuilder2'

let street1 = '750 Cascade Ave SW'
let street2 = ''
let city = 'Atlanta'
let state = 'GA'
let zip = '303'

let root = xmlbuilder2.create({ version: '1.0' })
    .ele('AddressValidateRequest', { USERID: '47E2NAWEB2669' })
    .ele('Address')
    .ele('Address1').txt(street1).up()
    .ele('Address2').txt(street2).up()
    .ele('City').txt(city).up()
    .ele('State').txt(state).up()
    .ele('Zip5').txt(zip).up()
    .ele('Zip4').txt('').up()
    .up()
    .up()

let xml = root.end({ prettyPrint: true })
console.log(xml)
let url = 'https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&xml=' + encodeURIComponent(xml)

axios.get(url)
    .then(function (response) {
        const obj = xmlbuilder2.convert(response.data, { format: "object" })
        console.log(obj)
    })
    .catch(function (error) {
        console.log(error)
    })


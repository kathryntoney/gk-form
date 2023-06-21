// import { USERID } from './key.js'
import express from 'express'
let app = express()
import axios from 'axios'
import { Builder, parseStringPromise } from 'xml2js'
const router = express.Router()
let port = 3005
const USPS_API_ENDPOINT = 'https://secure.shippingapis.com/ShippingAPI.dll';


// const cors = require('cors');
// app.use(cors({
//     origin: ['https://www.section.io', 'https://www.google.com/']
// }));

// app.use(express.json());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://www.section.io');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


app.get('/validate-address', async (req, res) => {
    const { street1, street2, city, state, zip } = req.query;
    const xmlBuilder = new Builder();
    const xmlRequest = xmlBuilder.buildObject({
        AddressValidateRequest: {
            '@USERID': '47E2NAWEB2669',
            Address: {
                Address1: street1,
                Address2: street2,
                City: city,
                State: state,
                Zip5: zip,
                Zip4: ''
            }
        }
    })
    try {
        const encodedXml = encodeURIComponent(xmlRequest)
        const url = `${USPS_API_ENDPOINT}?API=Verify&xml=${encodedXml}`
        const response = await axios.get(url)
        const xmlData = response.data
        const result = await xml2js.parseStringPromise(xmlData, { explicityArray: false })
        const obj = result.AddressValidateResponse.Address || null
        res.json(obj)
    } catch (error) {
        console.log('error in address validation: ', error)
        res.status(500)
            .json({ error: 'address validation failed' })
    }
})

app.use('/api', router)
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
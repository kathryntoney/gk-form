import axios from 'axios'
import xmlbuilder2 from 'xmlbuilder2'
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function AddressValidation() {

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

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdateClient((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    return (
        <>
            <Box>
                <h3>Enter your mailing address:</h3>
                <TextField
                    id="outlined-basic"
                    label="Street 1"
                    variant="outlined"
                    onChange={handleChange}
                    value={street1}
                    name="street1"
                />
                <TextField
                    id="outlined-basic"
                    label="Street 2"
                    variant="outlined"
                    onChange={handleChange}
                    value={street2}
                    name="street2"
                />
                <TextField
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    onChange={handleChange}
                    value={city}
                    name="city"
                />
                <TextField
                    id="outlined-basic"
                    label="State"
                    variant="outlined"
                    onChange={handleChange}
                    value={state}
                    name="state"
                />
                <TextField
                    id="outlined-basic"
                    label="Zipcode"
                    variant="outlined"
                    onChange={handleChange}
                    value={zip}
                    name="zip"
                />
            </Box>
        </>
    )
}
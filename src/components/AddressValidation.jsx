

export default function AddressValidation() {
    const axios = require('axios').default
    const xmlbuilder2 = require('xmlbuilder2')

    let root = xmlbuilder2.create({ version '1.0'})
        .ele('AddressValidateRequest', { USERID: '47E2NAWEB2669' })
        .ele('Address')
        .ele('Address1').txt(street1.value).up()
        .ele('Address2').txt(street2.value).up()
        .ele('City').txt(city.value).up()
        .ele('State').txt(state.value).up()
        .ele('Zip5').txt(zip.value).up()
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

    return (
        <>
            <Box>
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
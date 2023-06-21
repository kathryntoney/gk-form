import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Button from '@mui/material/Button'
import axios from 'axios'
import xmlbuilder from 'xmlbuilder2';
// import { parseStringPromise } from 'xml2js'
import { parseString } from 'xml-js'

function validateAddress(updateClient, setAddressValidation, setShowPopup) {
    const root = xmlbuilder.create({ version: '1.0' })
        .ele('AddressValidateRequest', { USERID: '47E2NAWEB2669' })
        .ele('Address')
        .ele('Address1').txt(updateClient.street1).up();
    if (updateClient.street2) {
        root.ele('Address2').txt(updateClient.street2).up()
    };
    root.ele('City').txt(updateClient.city).up()
    root.ele('State').txt(updateClient.state).up()
    root.ele('Zip5').txt(updateClient.zip).up()
    root.ele('Zip4').txt('').up()
    root.up()
    root.up()

    const xml = root.end({ pretty: true })
    console.log(xml)
    const encodedXml = encodeURIComponent(xml)
    let url = `https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&xml=${encodedXml}`

    axios.get(url)
        .then(function (response) {
            const xmlData = response.data;
            parseString(xmlData, { explicitArray: false }, function (err, result) {
                if (err) {
                    console.log(err)
                }
                else {
                    const obj = result.AddressValidateResponse.Address || null;
                    console.log(obj)
                    setAddressValidation(obj)
                    setShowPopup(true)
                }
            })
                .catch(function (error) {
                    console.log('error in addy validation ', error)
                })
        })

    // axios.get(url)
    //     .then(function (response) {
    //         const xmlData = response.data
    //         console.log(xmlData)
    //         parseStringPromise(xmlData, { explicitArray: false }).then(function (result) {
    //             const obj = result.AddressValidateResponse.Address || null;
    //             console.log(obj)
    //             setAddressValidation(obj)
    //             setShowPopup(true)
    //         })
    //     })
    //     .catch(function (error) {
    //         console.log(error)
    //     })
}

export default function HousingCrisis() {
    const colRef = collection(db, 'clients')
    const location = useLocation()
    const clientID = location.state?.clientID
    const dispatch = useDispatch()
    const [addressValidation, setAddressValidation] = useState(null)
    const [showPopup, setShowPopup] = useState(false)
    const [updateClient, setUpdateClient] = useState({
        statement: '',
        timeframe: '',
        crisisDate: '',
        cause: '',
        currentHousing: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdateClient((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleUpdateClientDoc = async (e) => {
        e.preventDefault()
        try {
            const docRef = doc(colRef, clientID)
            await updateDoc(docRef, { ...updateClient })
            console.log(docRef.id, ` updated`)
            dispatch(setCrisisDetails(
                clientID,
                updateClient.statement,
                updateClient.timeframe,
                updateClient.crisisDate,
                updateClient.cause,
                updateClient.currentHousing,
                updateClient.street1,
                updateClient.street2,
                updateClient.city,
                updateClient.state,
                updateClient.zip5,
                updateClient.zip4
            ))
        }
        catch {
            console.log(`error updating`)
        }
    }

    const handleValidateAddress = () => {
        validateAddress(
            updateClient,
            setAddressValidation,
            setShowPopup
        )
    }


    // showPopup && addressValidation && (
    //     <div>
    //         <h4>Address Validation</h4>
    //         <p>Please review the validated address:</p>
    //         <p>{addressValidation.Address1}</p>
    //         <p>{addressValidation.Address2}</p>
    //         <p>{addressValidation.City}</p>
    //         <p>{addressValidation.State}</p>
    //         <p>{addressValidation.Zip5}</p>
    //         <button onClick={() => setShowPopup(false)}>Close</button>
    //     </div>
    // )



    return (
        <>
            <Box>
                <h3>In the field below, please describe your crisis in detail.</h3>
                <TextField
                    id="outlined-basic"
                    label="Statement of Need"
                    variant="outlined"
                    onChange={handleChange}
                    value={updateClient.statement}
                    name="statement"
                />
                <InputLabel id="applicant-type-label">Did this disaster occur within the last six months?</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="applicant-type-select"
                    value={updateClient.timeframe}
                    name="timeframe"
                    label="Timeframe"
                    onChange={handleChange}
                >
                    <MenuItem value="yes">Yes, within the last six months</MenuItem>
                    <MenuItem value="no">No, it occurred more than six months ago</MenuItem>
                </Select>
                {updateClient.timeframe === 'no' && (
                    <p>Unfortunately, you are not eligible for financial assistance from Giving Kitchen at this time. But this doesn't mean you can't still get help - please refer to our <a href='https://thegivingkitchen.org/stability-network'>Stability Network</a> page to find more resources. </p>
                )}
                <TextField
                    id="outlined-basic"
                    label="Enter the approximate date that your crisis occurred"
                    variant="outlined"
                    onChange={handleChange}
                    value={updateClient.crisisDate}
                    name="crisisDate"
                />
                <InputLabel id="applicant-type-label">Which of the following best describes what happened to your housing?</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="applicant-type-select"
                    value={updateClient.cause}
                    name="cause"
                    label="Cause of Disaster"
                    onChange={handleChange}
                >
                    <MenuItem value="Fire">Fire</MenuItem>
                    <MenuItem value="Flood">Flood</MenuItem>
                    <MenuItem value="Mold">Mold</MenuItem>
                    <MenuItem value="Tornado">Tornado</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                    <MenuItem value="None, not experiencing a housing crisis">None, not experiencing a housing crisis</MenuItem>
                </Select>
                {updateClient.cause === 'None, not experiencing a housing crisis' && (
                    <p>Unfortunately, you are not eligible for financial assistance from Giving Kitchen at this time. But this doesn't mean you can't still get help - please refer to our <a href='https://thegivingkitchen.org/stability-network'>Stability Network</a> page to find more resources. </p>
                )}
                {updateClient.cause === 'Other' && (
                    <p>Redirect to Financial Award Process / Injury/Illness Application</p>
                )}
                <InputLabel id="applicant-type-label">Have you found a new place to live?</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="applicant-type-select"
                    value={updateClient.currentHousing}
                    name="currentHousing"
                    label="Current Housing"
                    onChange={handleChange}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                </Select>
                <h3>Enter your mailing address:</h3>
                <TextField
                    id="outlined-basic"
                    label="Street 1"
                    variant="outlined"
                    onChange={handleChange}
                    value={updateClient.street1}
                    name="street1"
                />
                <TextField
                    id="outlined-basic"
                    label="Street 2"
                    variant="outlined"
                    onChange={handleChange}
                    value={updateClient.street2}
                    name="street2"
                />
                <TextField
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    onChange={handleChange}
                    value={updateClient.city}
                    name="city"
                />
                <TextField
                    id="outlined-basic"
                    label="State"
                    variant="outlined"
                    onChange={handleChange}
                    value={updateClient.state}
                    name="state"
                />
                <TextField
                    id="outlined-basic"
                    label="Zipcode"
                    variant="outlined"
                    onChange={handleChange}
                    value={updateClient.zip5}
                    name="zip"
                />
                <Button onClick={handleValidateAddress}>Validate Address</Button>
                {updateClient.currentHousing === 'Yes' && (
                    <p>Redirect to Financial Award Process / Disaster Application</p>
                )}
                {updateClient.currentHousing === 'No' && (
                    <p>Redirect to Stability Network Process and Crisis Financial Aid Application</p>
                )}
                <Button variant='contained' onClick={handleUpdateClientDoc}>Exit</Button>
            </Box>
        </>
    )
}


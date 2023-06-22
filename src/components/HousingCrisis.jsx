import { Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { setCrisisDetails } from '../actions/crisisActions';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

export default function HousingCrisis() {
    const colRef = collection(db, 'clients')
    const location = useLocation()
    const clientID = location.state?.clientID
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')
    const [updateClient, setUpdateClient] = useState({
        statement: '',
        timeframe: '',
        crisisDate: '',
        cause: '',
        currentHousing: '',
        address: ''
    })

    // ADDRESS VALIDATION 
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
        },
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }) =>
            () => {
                console.log(description)
                setValue(description, false);
                clearSuggestions();
                getGeocode({ address: description }).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                    console.log("📍 Coordinates: ", { lat, lng });
                    // setAddress(description)
                    setUpdateClient((prevState) => ({
                        ...prevState,
                        address: description
                    }))
                });

            };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <>
                    <ListItem key={place_id} onClick={handleSelect(suggestion)}>
                        <strong>{main_text}</strong> <small>{secondary_text}</small>
                    </ListItem>
                </>
            );
        });
    // END ADDRESS VALIDATION

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
            console.log(updateClient, 'line 44')
            console.log(docRef.id, ` updated line 45`)
            dispatch(setCrisisDetails(
                clientID,
                updateClient.statement,
                updateClient.timeframe,
                updateClient.crisisDate,
                updateClient.cause,
                updateClient.currentHousing,
                address
            ))
        }
        catch (error) {
            console.log(`error updating`, error)
        }
    }

    return (
        <>
            <Box>
                <br />
                <div>
                    <InputLabel id="applicant-type-label">Please describe your crisis in detail using the field below:</InputLabel>
                    <FormControl sx={{
                        minWidth: 300
                    }}>
                        <TextField
                            id="outlined-basic"
                            label="Statement of Need"
                            variant="outlined"
                            multiline
                            onChange={handleChange}
                            value={updateClient.statement}
                            name="statement"
                        />
                    </FormControl>
                </div>
                <br />
                <div>
                    <InputLabel id="applicant-type-label">Did this disaster occur within the last six months?</InputLabel>
                    <FormControl sx={{
                        minWidth: 300
                    }}>
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
                    </FormControl>
                </div>
                <br />
                {updateClient.timeframe === 'no' && (
                    <p>Unfortunately, you are not eligible for financial assistance from Giving Kitchen at this time. But this doesn't mean you can't still get help - please refer to our <a href='https://thegivingkitchen.org/stability-network'>Stability Network</a> page to find more resources. </p>
                )}
                {updateClient.timeframe === 'yes' && (
                    <>
                        <div>
                            <InputLabel id="applicant-type-label">Enter the approximate date that your crisis occurred:</InputLabel>
                            <FormControl sx={{
                                minWidth: 300
                            }}>
                                <TextField
                                    id="outlined-basic"
                                    // label="Date of Crisis"
                                    variant="outlined"
                                    type="date"
                                    onChange={handleChange}
                                    value={updateClient.crisisDate}
                                    name="crisisDate"
                                />
                            </FormControl>
                        </div>
                        <br />
                        <div>
                            <InputLabel id="applicant-type-label">Which of the following best describes what happened to your housing?</InputLabel>
                            <FormControl sx={{
                                minWidth: 300
                            }}>
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
                            </FormControl>
                        </div>
                        <br />
                    </>
                )}
                {(updateClient.cause === 'Fire' || updateClient.cause === 'Flood' || updateClient.cause === 'Mold' || updateClient.cause === 'Tornado') && (
                    <>
                        <div>
                            <InputLabel id="applicant-type-label">Have you found a new place to live?</InputLabel>
                            <FormControl sx={{
                                minWidth: 300
                            }}>
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
                            </FormControl>
                        </div>
                        <br />
                        <div>
                            <InputLabel id="applicant-type-label">Enter your address and select the correct option, then click "Exit":</InputLabel>
                            <FormControl sx={{
                                minWidth: 300
                            }}>
                                <TextField
                                    id="outlined-basic"
                                    label="Address"
                                    variant="outlined"
                                    onChange={handleInput}
                                    value={value}
                                    name="address"
                                />
                            </FormControl>
                        </div>
                        <br />
                        {status === "OK" && <List>{renderSuggestions()}</List>}
                    </>
                )}
                {updateClient.cause === 'None, not experiencing a housing crisis' && (
                    <p>Unfortunately, you are not eligible for financial assistance from Giving Kitchen at this time. But this doesn't mean you can't still get help - please refer to our <a href='https://thegivingkitchen.org/stability-network'>Stability Network</a> page to find more resources. </p>
                )}
                {updateClient.cause === 'Other' && (
                    <p>Redirect to Financial Award Process / Injury/Illness Application</p>
                )}




                <Button variant='contained' onClick={handleUpdateClientDoc}>Exit</Button>

            </Box>
        </>
    )
}
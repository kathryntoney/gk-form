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
import { useLocation } from 'react-router-dom'
import { setIllnessCrisisDetails } from '../actions/crisisActions';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

export default function FuneralCrisis() {
    const colRef = collection(db, 'clients')
    const location = useLocation()
    const clientID = location.state?.clientID
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')
    const [updateClient, setUpdateClient] = useState({
        statement: '',
        relationship: '',
        timeframe: '',
        crisisDate: '',
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
            dispatch(setFuneralCrisisDetails(
                clientID,
                updateClient.statement,
                updateClient.relationship,
                updateClient.timeframe,
                updateClient.crisisDate,
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
                <div>
                    <InputLabel id="applicant-type-label">Please provide as many details as you are able about the funeral arrangements you had to make:</InputLabel>
                    <FormControl sx={{
                        minWidth: 300
                    }}>
                        <TextField
                            id="outlined-basic"
                            label="Statement of Need"
                            variant="outlined"
                            onChange={handleChange}
                            value={updateClient.statement}
                            name="statement"
                        />
                    </FormControl>
                    <InputLabel id="applicant-type-label">What is the applicant's relationship to the deceased?</InputLabel>
                    <FormControl sx={{
                        minWidth: 300
                    }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="applicant-type-select"
                            value={updateClient.relationship}
                            name="relationship"
                            label="Relationship"
                            onChange={handleChange}
                        >
                            <MenuItem value="Parent/Guardian">Parent/Guardian</MenuItem>
                            <MenuItem value="Grandparent">Grandparent</MenuItem>
                            <MenuItem value="Spouse/Partner">Spouse/Partner</MenuItem>
                            <MenuItem value="Child">Child</MenuItem>
                            <MenuItem value="Sibling">Sibling</MenuItem>
                            <MenuItem value="Grandchild">Grandchild</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>

                        </Select>
                    </FormControl>
                    {updateClient.relationship === 'Other' && (
                        <>
                            <Typography variant='h5'>
                                Unfortunately, you are not eligible for financial assistance from Giving Kitchen at this time. But this doesn't mean you can't still get help - please refer to our <a href='https://thegivingkitchen.org/stability-network'>Stability Network</a> page to find more resources.
                            </Typography>
                        </>
                    )}
                    {updateClient.relationship !== "Other" && (
                        <>
                            <InputLabel id="applicant-type-label">Did your family member pass within the last six months?</InputLabel>
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
                                    <MenuItem value="Yes">Yes, within the last six months</MenuItem>
                                    <MenuItem value="No">No, it occurred more than six months ago</MenuItem>
                                </Select>
                            </FormControl>
                            {updateClient.timeframe === "No" && (
                                <Typography variant='h5'>
                                    Unfortunately, you are not eligible for financial assistance from Giving Kitchen at this time. But this doesn't mean you can't still get help - please refer to our <a href='https://thegivingkitchen.org/stability-network'>Stability Network</a> page to find more resources.
                                </Typography>
                            )}
                            {updateClient.timeframe === "Yes" && (
                                <>
                                    <InputLabel id="applicant-type-label">Enter the date that your family member passed:</InputLabel>
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
                                    <br />
                                    {status === "OK" && <List>{renderSuggestions()}</List>}
                                </>
                            )}
                        </>
                    )}
                </div>
                <br />
                <Button variant='contained' onClick={handleUpdateClientDoc}>Exit</Button>
            </Box>
        </>
    )
}


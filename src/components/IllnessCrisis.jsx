import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl';
import { collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
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
        diagnosis: '',
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
                <li key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
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
                updateClient.diagnosis,
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
                <InputLabel id="applicant-type-label">Please describe your injury / illness crisis in detail using the field below:</InputLabel>
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
                <InputLabel id="applicant-type-label">Did you receive a medical diagnosis for this injury or condition?</InputLabel>
                <FormControl sx={{
                    minWidth: 300
                }}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="applicant-type-select"
                        value={updateClient.diagnosis}
                        name="timeframe"
                        label="Timeframe"
                        onChange={handleChange}
                    >
                        <MenuItem value="yes">Yes, within the last six months</MenuItem>
                        <MenuItem value="no">No, it occurred more than six months ago</MenuItem>
                    </Select>
                </FormControl>
                {updateClient.timeframe === 'no' && (
                    <Typography variant='h5'>
                        Unfortunately, you are not eligible for financial assistance from Giving Kitchen at this time. But this doesn't mean you can't still get help - please refer to our <a href='https://thegivingkitchen.org/stability-network'>Stability Network</a> page to find more resources.
                    </Typography>
                )}
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
                <Button variant='contained' onClick={handleUpdateClientDoc}>Exit</Button>
            </Box>
        </>
    )
}


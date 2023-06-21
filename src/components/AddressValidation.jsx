import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { setCrisisDetails } from '../actions/crisisActions';


export default function AddressValidation() {
    const dispatch = useDispatch()
    const clientID = useSelector(state => state.clients.clientID)
    console.log('line15 ', clientID)
    const [address, setAddress] = useState('')
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
                    setAddress(description)
                    dispatch(setCrisisDetails(
                        {
                            clientID,
                            address: description
                        }
                    ))
                    // console.log('line 46 set address: ', address)
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

    return (
        <>
            <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                onChange={handleInput}
                value={value}
                name="address"
            />
            {status === "OK" && <ul>{renderSuggestions()}</ul>}
        </>
    );
};
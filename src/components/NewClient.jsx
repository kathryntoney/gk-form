import { useState, useDispatch } from 'react'
import { Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux'
import { addDoc, collection } from 'firebase/firestore'
import DisplayClients from './DisplayClients';
import { db } from '../firebase'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { useHistory } from 'react-router-dom'

export default function NewClient() {
    const dispatch = useDispatch()
    const [selectedApplicantType, setSelectedApplicantType] = useState('')
    const colRef = collection(db, 'clients')
    const [client, setClient] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        language: '',
        pronouns: '',
        referName: '',
        referEmail: '',
        referPhone: '',
        informed: ''
    })

    const clientList = useSelector(state => state.clients)

    const handleApplicantTypeChange = (e) => {
        setSelectedApplicantType(e.target.value)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient((prevClient) => ({
            ...prevClient,
            [name]: value
        }))
    }

    const createNewClient = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(colRef, {
                client: client,
            })
            console.log('document written with ID:', docRef.id)
        } catch (error) {
            console.log('error adding document: ', error)
        }
    }

    return (
        <Box>
            <form>
                <InputLabel id="applicant type">For whom are you filling out this form?</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedApplicantType}
                    label="Applicant"
                    onChange={handleApplicantTypeChange}
                >
                    <MenuItem value="Myself">Myself</MenuItem>
                    <MenuItem value="Someone else">Someone else</MenuItem>
                </Select>
                {/* IF REFERRING SOMEONE ELSE - REFERRER INFO */}
                {selectedApplicantType === 'Someone else' && (
                    <>
                        <Typography variant='h5'>If you are filling out this form for someone else, please enter your own contact information here:</Typography>
                        <TextField
                            id="outlined-basic"
                            label="Referrer Name (first and last)"
                            variant="outlined"
                            onChange={handleChange}
                            value={client.referName}
                            name="referName"
                        />
                        <TextField
                            id="outlined-basic"
                            label="Referrer Email"
                            variant="outlined"
                            onChange={handleChange}
                            value={client.referEmail}
                            name="referEmail"
                        />
                        <TextField
                            id="outlined-basic"
                            label="Referrer Phone"
                            variant="outlined"
                            onChange={handleChange}
                            value={client.referPhone}
                            name="referPhone"
                        />
                        <InputLabel id="applicant-type-label">Have you informed this person that you're referring them to GK?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="applicant-type-select"
                            value={client.informed}
                            name="informed"
                            label="Informed"
                            onChange={handleChange}
                        >
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                        </Select>
                    </>
                )
                }
                <InputLabel id="preferred-language">Preferred language of person in need:</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={client.language}
                    name="language"
                    label="Preferred Language"
                    onChange={handleChange}
                >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Spanish">Spanish</MenuItem>
                    <MenuItem value="Cantonese">Cantonese</MenuItem>
                    <MenuItem value="Korean">Korean</MenuItem>
                    <MenuItem value="Mandarin">Mandarin</MenuItem>
                    <MenuItem value="Portuguese">Portuguese</MenuItem>
                    <MenuItem value="Vietnamese">Vietnamese</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
                <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    onChange={handleChange}
                    value={client.firstName}
                    name="firstName"
                />
                <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    onChange={handleChange}
                    value={client.lastName}
                    name="lastName"
                />
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={handleChange}
                    value={client.email}
                    name="email"
                />
                <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    onChange={handleChange}
                    value={client.phone}
                    name="phone"
                />
                <InputLabel id="preferred-pronouns">Preferred pronouns:</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={client.pronouns}
                    name="pronouns"
                    label="Preferred Pronouns"
                    onChange={handleChange}
                >
                    <MenuItem disabled value="Pronouns">Pronouns</MenuItem>
                    <MenuItem value="She/her/hers">She/her/hers</MenuItem>
                    <MenuItem value="He/Him/his">He/Him/his</MenuItem>
                    <MenuItem value="They/them/theirs">They/them/theirs</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
                <Button variant='contained' onClick={createNewClient}>Continue</Button>
            </form>
            <DisplayClients />
        </Box>
    )
}
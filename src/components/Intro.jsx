import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { addNewClient } from '../actions/introActions'
import { useDispatch, useSelector } from 'react-redux'
import ClientItem from './ClientItem';

export default function Intro() {
    const [clientInfo, setClientInfo] = useState({
        id: crypto.randomUUID(),
        applicant: 'Myself',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        language: 'English',
        pronouns: '',
        referName: '',
        referEmail: '',
        referPhone: '',
        informed: ''
    })
    const [selectedApplicantType, setSelectedApplicantType] = useState('Myself')
    const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState('')
    const [timeLimit, setTimeLimit] = useState('')
    const dispatch = useDispatch()
    const clientList = useSelector(state => state.clients)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientInfo((prevState) => ({
            ...prevState,
            [name]: value
        })
        )
    }

    const handleApplicantTypeChange = (e) => {
        setSelectedApplicantType(e.target.value)
    }

    const handleEmploymentStatusChange = (e) => {
        setSelectedEmploymentStatus(e.target.value)
    }

    const handleTimeLimitChange = (e) => {
        setTimeLimit(e.target.value)
    }



    const createNewClient = (client) => {
        e.preventDefault()
        console.log(client)
        dispatch(addNewClient(id, firstName, lastName, email, phone, language, pronouns, referName, referEmail, referPhone, informed))
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            m: 3
        }}>
            <form onSubmit={createNewClient}>
                <Typography variant='h2'>Ask For Help Form</Typography>
                <InputLabel id="preferred-language">Preferred language:</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={clientInfo.language}
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
                {/* APPLICANT TYPE */}
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
                            value={clientInfo.referName}
                            name="referName"
                        />
                        <TextField
                            id="outlined-basic"
                            label="Referrer Email"
                            variant="outlined"
                            onChange={handleChange}
                            value={clientInfo.referEmail}
                            name="referEmail"
                        />
                        <TextField
                            id="outlined-basic"
                            label="Referrer Phone"
                            variant="outlined"
                            onChange={handleChange}
                            value={clientInfo.referPhone}
                            name="referPhone"
                        />
                        <InputLabel id="applicant-type-label">Have you informed this person that you're referring them to GK?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="applicant-type-select"
                            value={clientInfo.applicant}
                            name="applicant"
                            label="Applicant"
                            onChange={handleChange}
                        >
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                        </Select>
                    </>
                )
                }
                <br />
                <br />
                {/* CLIENT INFO */}
                <Typography variant='h5'>Fill out the remainder of this form for the person in need (either yourself or the person you are referring):</Typography>
                <InputLabel id="employment-status">Are you, or is the person you're referring, currently employed in the food/beverage service industry?</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={employmentStatus}
                    name="employmentStatus"
                    label="Employment Status"
                    onChange={handleEmploymentStatusChange}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                </Select>
                {selectedEmploymentStatus === 'No' && (
                    <>
                        <InputLabel id="employment-status">Have you or the person you're referring worked in the food/beverage service industry within the last four weeks?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={timeLimit}
                            name="timeLimit"
                            label="Employed in last four weeks"
                            onChange={handleTimeLimitChange}
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </>
                    {selectedTimeLimit === 'Yes' && (
                    // continue form
                    )}
                {selectedTimeLimit === 'No' && (
                    <>
                        <div>
                            Unfortunately, you are not eligible for financial assistance from Giving Kitchen at this time. But this doesn't mean you can't still get help - please refer to our <a href='https://thegivingkitchen.org/stability-network'>Stability Network</a> page to find more resources.
                        </div>
                    </>
                )}
                )}
                <Button variant="contained" type="submit">Submit</Button>
            </form >

            <ul>
                <li>
                    {clientList.map(clientObj => {
                        return <ClientItem key={clientObj.id} clientObj={clientObj} />
                    })}
                </li>
            </ul>
        </Box >
    )
}
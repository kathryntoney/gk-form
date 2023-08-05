import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { addNewClient } from '../actions/newClientActions';

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: ['Roboto Mono', 'monospace'].join(',')
        }
    }
})

export default function NewClient({ clientID }) {
    const [selectedApplicantType, setSelectedApplicantType] = useState('Myself')
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [email, setEmail] = useState('')
    const [referEmail, setReferEmail] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
            console.log('document written with ID NewClient:', docRef.id)
            dispatch(addNewClient(client, docRef.id))
            navigate('/crisis', { state: { clientID: docRef.id } })
        } catch (error) {
            console.log('error adding document: ', error)
        }
    }

    const emailValidation = (e) => {
        const emailValue = e.target.value
        setEmail(emailValue)
        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
        const isValid = pattern.test(emailValue)
        setIsEmailValid(isValid)
    }


    return (
        <ThemeProvider theme={theme}>
            <Box className='new-client-form' sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 3,
            }}>
                <form>
                    <div>

                        <InputLabel sx={{ display: 'flex', flexWrap: 'wrap', whiteSpace: 'pre-wrap', mb: 1 }} id="applicant type">For whom are you filling out this form?</InputLabel>
                        <FormControl sx={{
                            minWidth: 300
                        }}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedApplicantType}
                                label="Applicant"
                                onChange={handleApplicantTypeChange}
                            >
                                <MenuItem sx={{ whiteSpace: 'normal' }} value="Myself">Myself</MenuItem>
                                <MenuItem sx={{ whiteSpace: 'normal' }} value="Someone else">Someone else</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    {/* IF REFERRING SOMEONE ELSE - REFERRER INFO */}
                    {selectedApplicantType === 'Someone else' && (
                        <>
                            <div>
                                <Typography variant='h6'>If you are filling out this form for someone else, please enter your own contact information here:</Typography>
                                <InputLabel sx={{ display: 'flex', flexWrap: 'wrap', whiteSpace: 'pre-wrap', mb: 1, mt: 2 }}>Referrer Name (first and last)</InputLabel>
                                <FormControl sx={{
                                    minWidth: 300
                                }}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Referrer Name"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={client.referName}
                                        name="referName"
                                    />
                                </FormControl>
                            </div>
                            <br />
                            <div>
                                <InputLabel sx={{ display: 'flex', flexWrap: 'wrap', whiteSpace: 'pre-wrap', mb: 1 }}>Referrer Email</InputLabel>
                                <FormControl sx={{
                                    minWidth: 300
                                }}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Referrer Email"
                                        type="email"
                                        variant="outlined"
                                        required
                                        onChange={(e) => {
                                            const emailValue = e.target.value;
                                            setReferEmail(emailValue);
                                            const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                                            const isValid = pattern.test(emailValue);
                                            setIsEmailValid(isValid);
                                            handleChange(e)
                                        }}
                                        value={client.referEmail}
                                        name="referEmail"
                                        error={!isEmailValid}
                                        helperText={!isEmailValid ? 'invalidemail format' : ""}
                                    />
                                </FormControl>
                            </div>
                            <br />
                            <div>
                                <InputLabel sx={{ display: 'flex', flexWrap: 'wrap', whiteSpace: 'pre-wrap', mb: 1 }}>Referrer Phone</InputLabel>
                                <FormControl sx={{
                                    minWidth: 300
                                }}>
                                    <TextField
                                        id="outlined-basic"
                                        // label="Referrer Phone"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={client.referPhone}
                                        // type="number"
                                        name="referPhone"
                                    />
                                </FormControl>
                            </div>
                            <br />
                            <div>
                                <InputLabel sx={{ display: 'flex', flexWrap: 'wrap', whiteSpace: 'pre-wrap', mb: 1 }} id="applicant-type-label">Have you informed this person that you're referring them to GK?</InputLabel>
                                <FormControl sx={{
                                    minWidth: 300
                                }}>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="applicant-type-select"
                                        value={client.informed}
                                        name="informed"
                                        label="Informed"
                                        onChange={handleChange}
                                    >
                                        <MenuItem sx={{ whiteSpace: 'normal' }} value="Yes">Yes</MenuItem>
                                        <MenuItem sx={{ whiteSpace: 'normal' }} value="No">No</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <br />
                        </>
                    )
                    }
                    <div>
                        <InputLabel sx={{ display: 'flex', flexWrap: 'wrap', whiteSpace: 'pre-wrap', mb: 1 }} id="preferred-language">Preferred language of person in need:</InputLabel>
                        <FormControl sx={{
                            minWidth: 300
                        }}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={client.language}
                                name="language"
                                // label="Preferred Language"
                                onChange={handleChange}
                            >
                                <MenuItem sx={{ whiteSpace: 'normal' }} value="English">English</MenuItem>
                                <MenuItem sx={{ whiteSpace: 'normal' }} value="Spanish">Spanish</MenuItem>
                                <MenuItem sx={{ whiteSpace: 'normal' }} value="Cantonese">Cantonese</MenuItem>
                                <MenuItem sx={{ whiteSpace: 'normal' }} value="Korean">Korean</MenuItem>
                                <MenuItem sx={{ whiteSpace: 'normal' }} value="Mandarin">Mandarin</MenuItem>
                                <MenuItem sx={{ whiteSpace: 'normal' }} value="Portuguese">Portuguese</MenuItem>
                                <MenuItem sx={{ whiteSpace: 'normal' }} value="Vietnamese">Vietnamese</MenuItem>
                                <MenuItem sx={{ whiteSpace: 'normal' }} value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <InputLabel sx={{ display: 'flex', flexWrap: 'wrap', whiteSpace: 'pre-wrap', mb: 1 }}>Applicant's First Name</InputLabel>
                        <FormControl sx={{
                            minWidth: 300
                        }}>
                            <TextField
                                id="outlined-basic"
                                label="First Name"
                                variant="outlined"
                                required
                                onChange={handleChange}
                                value={client.firstName}
                                name="firstName"
                            />
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <InputLabel sx={{ display: 'flex', flexWrap: 'wrap', whiteSpace: 'pre-wrap', mb: 1 }}>Applicant's Last Name</InputLabel>
                        <FormControl sx={{
                            minWidth: 300
                        }}>
                            <TextField
                                id="outlined-basic"
                                label="Last Name"
                                variant="outlined"
                                required
                                onChange={handleChange}
                                value={client.lastName}
                                name="lastName"
                            />
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <InputLabel sx={{ display: 'flex', flexWrap: 'wrap', whiteSpace: 'pre-wrap', mb: 1 }}>Applicant's Email</InputLabel>
                        <FormControl sx={{
                            minWidth: 300
                        }}>
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                type="email"
                                variant="outlined"
                                required
                                onChange={(e) => {
                                    const emailValue = e.target.value;
                                    setReferEmail(emailValue);
                                    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                                    const isValid = pattern.test(emailValue);
                                    setIsEmailValid(isValid);
                                    handleChange(e)
                                }}
                                value={client.email}
                                name="email"
                                error={!isEmailValid}
                                helperText={!isEmailValid ? 'invalid email format' : ""}
                            />
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <InputLabel sx={{ display: 'flex', flexWrap: 'wrap', whiteSpace: 'pre-wrap', mb: 1 }}>Applicant's Phone Number</InputLabel>
                        <FormControl sx={{
                            minWidth: 300
                        }}>
                            <TextField
                                id="outlined-basic"
                                // label="Phone Number"
                                // type="number"
                                variant="outlined"
                                required
                                onChange={handleChange}
                                value={client.phone}
                                name="phone"
                            />
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <InputLabel sx={{ display: 'flex', flexWrap: 'wrap', whiteSpace: 'pre-wrap', mb: 1 }} id="preferred-pronouns">Preferred pronouns:</InputLabel>
                        <FormControl sx={{
                            minWidth: 300
                        }}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={client.pronouns}
                                name="pronouns"
                                // label="Preferred Pronouns"
                                onChange={handleChange}
                            >
                                <MenuItem sx={{ whiteSpace: 'normal' }} value="She/her/hers">She/her/hers</MenuItem>
                                <MenuItem sx={{ whiteSpace: 'normal' }} value="He/Him/his">He/Him/his</MenuItem>
                                <MenuItem sx={{ whiteSpace: 'normal' }} value="They/them/theirs">They/them/theirs</MenuItem>
                                <MenuItem sx={{ whiteSpace: 'normal' }} value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <Button variant='contained' onClick={createNewClient}>Continue</Button>
                </form>
            </Box >
        </ThemeProvider>
    )
}
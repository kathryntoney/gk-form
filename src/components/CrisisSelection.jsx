import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import HousingCrisis from './HousingCrisis'
import IllnessCrisis from './IllnessCrisis'
import FuneralCrisis from './FuneralCrisis'
import SubstanceCrisis from './SubstanceCrisis'
import { useLocation } from 'react-router-dom'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useDispatch } from 'react-redux'

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: ['Roboto Mono', 'monospace'].join(',')
        }
    }
})

export default function CrisisSelection() {
    const [crisisType, setCrisisType] = useState('')
    const [statement, setStatement] = useState('')
    const dispatch = useDispatch()
    const location = useLocation()
    const colRef = collection(db, 'clients')
    const clientID = location.state?.clientID

    const handleSetCrisisType = (e) => {
        e.preventDefault()
        const selectedCrisisType = e.target.value;
        setCrisisType(selectedCrisisType)
        const docRef = doc(colRef, clientID)
        updateDoc(docRef, { crisisType })
            .then(docRef => {
                console.log(`crisis type added to `, clientID)
            })
            .catch(error => {
                console.log(`couldn't add crisis type `, error)
            })
    }

    const handleSetStatement = (e) => {
        setStatement(e.target.value)
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box>
                    <form>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            m: 3
                        }}>
                            <Typography className='title' variant='h2'>Ask for Help Form</Typography>
                        </Box>
                        <InputLabel id="preferred-language">Which of the following categories best describes the crisis you (or the person you are referring) are experiencing?</InputLabel>
                        <FormControl sx={{
                            minWidth: 300
                        }}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={crisisType}
                                name="crisisType"
                                label="Crisis Type"
                                onChange={handleSetCrisisType}
                            >
                                <MenuItem value="Housing disaster">Housing disaster</MenuItem>
                                <MenuItem value="Illness/injury (physical or mental)">Illness/injury (physical or mental)</MenuItem>
                                <MenuItem value="Illness (substance)">Illness (substance)</MenuItem>
                                <MenuItem value="Funeral">Funeral</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        {crisisType === 'Other' && (
                            <>
                                <p>Based on your responses so far, we are unable to make a clear determination on your eligibility for assistance. Please use the field below to fill out a Statement of Need. You should allow 5-7 business days for a response. In the meantime, please check out our <a href='https://thegivingkitchen.org/stability-network'>Stability Network</a> resources.</p>
                                <FormControl sx={{
                                    minWidth: 300
                                }}>
                                    <TextField
                                        id="outlined-basic"
                                        label="First Name"
                                        variant="outlined"
                                        multiline
                                        onChange={handleSetStatement}
                                        value={statement}
                                        name="firstName"
                                    />
                                </FormControl>
                            </>
                        )}
                        {crisisType === 'Housing disaster' && (
                            <>
                                <HousingCrisis clientID={clientID} />
                            </>
                        )}
                        {crisisType === 'Illness/injury (physical or mental)' && (
                            <>
                                <IllnessCrisis clientID={clientID} />
                            </>
                        )}
                        {crisisType === 'Illness (substance)' && (
                            <>
                                <SubstanceCrisis />
                            </>
                        )}
                        {crisisType === 'Funeral' && (
                            <>
                                <FuneralCrisis />
                            </>
                        )}
                    </form>
                </Box>
                <br />
            </ThemeProvider>
        </>
    )
}
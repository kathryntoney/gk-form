import { useState } from 'react'
import { Box } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import HousingCrisis from './HousingCrisis'
import { useLocation } from 'react-router-dom'
import { collection } from 'firebase/firestore'
import { db } from '../firebase'
import { useDispatch } from 'react-redux'


export default function CrisisSelection() {
    const [crisisType, setCrisisType] = useState('')
    const [statement, setStatement] = useState('')
    const dispatch = useDispatch()
    const location = useLocation()
    const colRef = collection(db, 'clients')
    const clientID = location.state?.clientID

    const handleSetCrisisType = async (e) => {
        e.preventDefault()
        const { value } = e.target;
        dispatch(setCrisisType(colRef.clientID, value))
        // try {
        //     const docRef = await updateDoc(colRef, {
        //         id: clientID
        //     })
        //     console.log('updated crisis type ', clientID)
        //     dispatch(setCrisisType(docRef, value))
        //     console.log('inside set crisis type ', clientID)
        // }
        // catch (error) {
        //     console.log('error updating crisis type: ', error)
        // }
    }

    const handleSetStatement = (e) => {
        setStatement(e.target.value)
    }

    return (
        <>
            <Box>
                <form>
                    <InputLabel id="preferred-language">Which of the following categories best describes the crisis you (or the person you are referring) are experiencing?</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={crisisType}
                        name="crisisType"
                        label="Crisis Type"
                        onChange={handleSetCrisisType}
                    >
                        <MenuItem value="Housing disaster">Housing disaster</MenuItem>
                        {/* <MenuItem value="Illness/injury (physical or mental)">Illness/injury (physical or mental)</MenuItem>
                        <MenuItem value="Illness (substance)">Illness (substance)</MenuItem>
                        <MenuItem value="Funeral">Funeral</MenuItem> */}
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    {crisisType === 'Other' && (
                        <>
                            <p>Based on your responses so far, we are unable to make a clear determination on your eligibility for assistance. Please use the field below to fill out a Statement of Need. You should allow 5-7 business days for a response. In the meantime, please check out our <a href='https://thegivingkitchen.org/stability-network'>Stability Network</a> resources.</p>
                            <TextField
                                id="outlined-basic"
                                label="First Name"
                                variant="outlined"
                                onChange={handleSetStatement}
                                value={statement}
                                name="firstName"
                            />
                        </>
                    )}
                    {crisisType === 'Housing disaster' && (
                        <>
                            <HousingCrisis clientID={clientID} />
                        </>
                    )}
                    {/* {crisisType === 'Illness/injury (physical or mental)' && (
                        <>
                            <IllnessCrisis />
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
                    )} */}
                </form>
            </Box>
        </>
    )
}
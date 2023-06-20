import { useState } from 'react'
import { Box } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

export default function CrisisSelection() {
    const [selectedCrisis, setSelectedCrisis] = useState('')
    const [statement, setStatement] = useState('')

    const handleSetSelectedCrisis = (e) => {
        const { name, value } = e.target;
        setSelectedCrisis((prevCrisis) => ({
            ...prevCrisis,
            [name]: value
        }))
    }

    const handleSetStatement = (e) => {
        setStatement(e.target.value)
    }


    return (
        <>
            <Box>
                <form>
                    <InputLabel id="preferred-language">Which of the following categories best describes the crisis you / your referrer are experiencing?</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={client.selectedCrisis}
                        name="crisisType"
                        label="Crisis Type"
                        onChange={handleSetSelectedCrisis}
                    >
                        <MenuItem value="Housing disaster">Housing disaster</MenuItem>
                        <MenuItem value="Illness/injury (physical or mental)">Illness/injury (physical or mental)</MenuItem>
                        <MenuItem value="Illness (substance)">Illness (substance)</MenuItem>
                        <MenuItem value="Funeral">Funeral</MenuItem>
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
                                value={client.statement}
                                name="firstName"
                            />
                        </>
                    )}
                    {crisisType === 'Housing disaster' && (
                        <>
                            <HousingCrisis />
                        </>
                    )}
                    {crisisType === 'Illness/injury (physical or mental)' && (
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
                    )}
                </form>
            </Box>
        </>
    )
}
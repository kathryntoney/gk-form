import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function HousingCrisis() {
    return (
        <>
            <Box>
                <h3>In the field below, please describe your crisis in detail.</h3>
                <TextField
                    id="outlined-basic"
                    label="Statement of Need"
                    variant="outlined"
                    onChange={handleChange}
                    value={client.statement}
                    name="referName"
                />
                <InputLabel id="applicant-type-label">Did this disaster occur within the last six months?</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="applicant-type-select"
                    value={client.timeframe}
                    name="timeframe"
                    label="Timeframe"
                    onChange={handleChange}
                >
                    <MenuItem value="yes">Yes, within the last six months</MenuItem>
                    <MenuItem value="no">No, it occurred more than six months ago</MenuItem>
                </Select>
                {timeframe === 'no' && (
                    <p>Unfortunately, you are not eligible for financial assistance from Giving Kitchen at this time. But this doesn't mean you can't still get help - please refer to our <a href='https://thegivingkitchen.org/stability-network'>Stability Network</a> page to find more resources. </p>
                )}
                <TextField
                    id="outlined-basic"
                    label="Enter the approximate date that your crisis occurred"
                    variant="outlined"
                    onChange={handleChange}
                    value={client.crisisDate}
                    name="crisisDate"
                />
                <InputLabel id="applicant-type-label">Which of the following best describes what happened to your housing?</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="applicant-type-select"
                    value={client.cause}
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
                {cause === 'None, not experiencing a housing crisis' && (
                    <p>Unfortunately, you are not eligible for financial assistance from Giving Kitchen at this time. But this doesn't mean you can't still get help - please refer to our <a href='https://thegivingkitchen.org/stability-network'>Stability Network</a> page to find more resources. </p>
                )}
                {cause === 'Other' && (
                    <p>Redirect to Financial Award Process / Injury/Illness Application</p>
                )}
                <InputLabel id="applicant-type-label">Have you found a new place to live?</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="applicant-type-select"
                    value={client.currentHousing}
                    name="currentHousing"
                    label="Current Housing"
                    onChange={handleChange}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                </Select>
                {currentHousing === 'Yes' && (
                    <p>Redirect to Financial Award Process / Disaster Application</p>
                )}
                {currentHousing === 'No' && (
                    <p>Redirect to Stability Network Process and Crisis Financial Aid Application</p>
                )}
            </Box>
        </>
    )
}


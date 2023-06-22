import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import NewClient from './NewClient';

export default function Intro() {
    const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState('')
    const [timeLimit, setTimeLimit] = useState('')

    const handleEmploymentStatusChange = (e) => {
        setSelectedEmploymentStatus(e.target.value)
    }

    const handleTimeLimitChange = (e) => {
        setTimeLimit(e.target.value)
    }

    return (

        <>
            <Box className='title' sx={{
                display: 'flex',
                justifyContent: 'center',
                m: 3
            }}>
                <Typography className='title' variant='h2'>Ask For Help Form</Typography>
            </Box>
            <form>
                <Box className='intro-form' sx={{
                    // display: 'flex',
                    // flexDirection: 'column',
                    // // justifyContent: 'center',
                    // m: 3,
                }}>
                    <InputLabel id="employment-status">Are you, or is the person you're referring, currently employed in the food/beverage service industry?</InputLabel>
                    <FormControl sx={{
                        minWidth: 300
                    }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedEmploymentStatus}
                            name="employmentStatus"
                            label="Employment Status"
                            onChange={handleEmploymentStatusChange}
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </FormControl>
                    {selectedEmploymentStatus === 'No' && (
                        <>
                            <InputLabel id="employment-status">Have you (or the person you're referring, if you're filling this out for someone else) worked in the food/beverage service industry within the last four weeks?</InputLabel>
                            <FormControl sx={{
                                minWidth: 300
                            }}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={timeLimit}
                                    name="timeLimit"
                                    label="Employed in last four weeks"
                                    onChange={handleTimeLimitChange}
                                >
                                    <MenuItem value="Yes">Yes, within the last four weeks</MenuItem>
                                    <MenuItem value="No">No, it has been longer than four weeks</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    )}
                    {selectedEmploymentStatus === 'Yes' && (
                        <>
                            <NewClient />
                        </>
                    )}
                    {timeLimit === 'Yes' && (
                        <>
                            <NewClient />
                        </>
                    )}
                    {timeLimit === 'No' && (
                        <>
                            <Typography variant='h5'>
                                Unfortunately, you are not eligible for financial assistance from Giving Kitchen at this time. But this doesn't mean you can't still get help - please refer to our <a href='https://thegivingkitchen.org/stability-network'>Stability Network</a> page to find more resources.
                            </Typography>
                        </>
                    )}
                </Box >
            </form >
        </>
    )
}
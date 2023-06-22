import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import GKCarousel from './Carousel'

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: ['Roboto Mono', 'monospace'].join(',')
        }
    }
})

export default function Home() {


    return (
        <>
            <GKCarousel />
        </>
    )
}
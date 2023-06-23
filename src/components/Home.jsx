// import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import GKCarousel from './Carousel'
import { ThemeProvider, createTheme } from '@mui/material/styles'

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
            <ThemeProvider theme={theme}>
                <div className='num-served'>
                    <img className='num-img' src="https://images.squarespace-cdn.com/content/v1/59ef9a244c0dbf3814d94d38/07cea7a1-625a-4fa1-b7f5-f272c49fe066/website+counter.png?format=1000w" alt="" />
                    <Typography sx={{
                        color: '#ee6d4e',
                        fontSize: '30px',
                        fontWeight: 'bold',
                        border: '4px solid #ee6d4e',
                        // borderBottom: 'rpx solid #ee6d4e',
                        paddingLeft: 3,
                        paddingRight: 3,
                        m: 1
                    }}>FOOD SERVICE WORKERS SERVED</Typography>
                </div>
            </ThemeProvider>
        </>


    )
}
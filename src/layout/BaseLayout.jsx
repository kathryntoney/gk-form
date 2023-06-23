import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: ['Roboto Mono', 'monospace'].join(','),
            color: '#2a4988',
            textDecoration: 'none'
        }
    }
})

const BaseLayout = (props) => {
    return (
        <>
            <div className='BaseLayout'>
                <ThemeProvider theme={theme}>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar className="navbar" position="static">
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    aria-label="menu"
                                    sx={{
                                        mr: 2,
                                        height: 100
                                    }}
                                >
                                    <a href='/'><img height="80px" src="https://images.squarespace-cdn.com/content/v1/59ef9a244c0dbf3814d94d38/1580762612906-BMFM6TLDZ8L03MC2R7WB/GK_Logotype.jpg?format=1500w" alt="" /></a>
                                </IconButton>
                                <Typography className='nav' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    <Link href='https://thegivingkitchen.org/who-we-are'>ABOUT US</Link>
                                    <Link href='https://thegivingkitchen.org/stability-network'>STABILITY NETWORK</Link>
                                    <Link href='https://thegivingkitchen.org/give'>DONATE</Link>
                                    <Link href='/form'>ASK FOR HELP</Link>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <div className='content' style={{ flexGrow: 1 }}>
                        {props.children}
                    </div>
                    <br />
                    <br />
                    <ThemeProvider theme={theme}>
                        <Box className='footer-container'>
                            {/* <Container maxWidth="lg"> */}
                            <Grid container direction="column" className='grid'>
                                <Grid className='grid-top' item xs={12}>
                                    <Typography color="white" variant='h4'>
                                        WE ARE GIVING KITCHEN.
                                    </Typography>
                                    <Typography color="white" variant='h4'>
                                        WE HELP FOOD SERVICE WORKERS.
                                    </Typography>
                                </Grid>
                                <Grid className='grid-bottom' item xs={12}>
                                    {/* <Typography color="white" variant="subtitle1">
                                    test
                                </Typography> */}
                                    <img src="https://images.squarespace-cdn.com/content/v1/59ef9a244c0dbf3814d94d38/1616001978701-3VRESJHXEYB8DXO7R9N4/award-logos.png?format=750w" alt="" />
                                </Grid>
                            </Grid>
                            {/* </Container> */}
                        </Box>
                    </ThemeProvider>

                </ThemeProvider>
            </div>
        </>
    )
}

export default BaseLayout
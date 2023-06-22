import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar className="navbar" position="static">
                        <Toolbar>
                            <IconButton
                                // size="small"
                                edge="start"
                                // color="inherit"
                                aria-label="menu"
                                sx={{
                                    mr: 2,
                                    height: 100
                                }}
                            >
                                <a href='/'><img height="80px" src="https://images.squarespace-cdn.com/content/v1/59ef9a244c0dbf3814d94d38/1580762612906-BMFM6TLDZ8L03MC2R7WB/GK_Logotype.jpg?format=1500w" alt="" /></a>
                                
                                {/* <MenuIcon /> */}
                            </IconButton>
                            <Typography className='nav' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <Link href='https://thegivingkitchen.org/who-we-are'>ABOUT US</Link>
                                <Link href='https://thegivingkitchen.org/stability-network'>STABILITY NETWORK</Link>
                                <Link href='https://thegivingkitchen.org/give'>DONATE</Link>
                                <Link href='/form'>ASK FOR HELP</Link>
                                {/* <Button sx={{
                                    color: '#2a4988',
                                    fontSize: '25px'
                                }} className='nav-link'>About Us</Button>
                                <Button sx={{
                                    color: '#2a4988',
                                    fontSize: '25px'
                                }} className='nav-link'>Stability Network</Button>
                                <Button sx={{
                                    color: '#2a4988',
                                    fontSize: '25px',
                                }} className='nav-link'>Donate</Button> */}
                            </Typography>
                            {/* <Menu>
                            {pages.map((page) => (
                                <MenuItem>{page}</MenuItem>
                            ))}
                        </Menu> */}
                        </Toolbar>
                    </AppBar>
                </Box>
                {props.children}
            </ThemeProvider>
        </>
    )
}

export default BaseLayout
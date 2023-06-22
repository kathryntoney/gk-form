import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu'

const pages = ['About Us', 'Stability Network', 'Donate']

const BaseLayout = (props) => {
    return (
        <>
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
                            <img height="80px" src="https://images.squarespace-cdn.com/content/v1/59ef9a244c0dbf3814d94d38/1580762612906-BMFM6TLDZ8L03MC2R7WB/GK_Logotype.jpg?format=1500w" alt="" />
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Button className='nav-link'>About Us</Button>
                        <Button className='nav-link'>Stability Network</Button>
                        <Button className='nav-link'>Donate</Button>
                        {/* <Menu>
                            {pages.map((page) => (
                                <MenuItem>{page}</MenuItem>
                            ))}
                        </Menu> */}
                    </Toolbar>
                </AppBar>
            </Box>
            {props.children}
        </>
    )
}

export default BaseLayout
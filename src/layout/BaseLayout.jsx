import React, { useState } from 'react'
import { Paper, SwipeableDrawer, Divider, Toolbar, Hidden, Box, AppBar, Typography, IconButton, List, ListItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import '../components/styles.css'

const links = [
    { name: 'ABOUT US', href: 'https://thegivingkitchen.org/who-we-are' },
    { name: 'STABILITY NETWORK', href: 'https://thegivingkitchen.org/stability-network' },
    { name: 'DONATE', href: 'https://thegivingkitchen.org/give' },
    { name: 'ASK FOR HELP', href: '/form' }
];

const BaseLayout = (props) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className='BaseLayout'>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar className="navbar" position="static">
                        <Toolbar sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <IconButton
                                edge="start"
                                aria-label="menu"
                                sx={{
                                    mr: 2,
                                    mt: 1
                                }}
                            >
                                <a href='/'><img height="50vh" src="https://images.squarespace-cdn.com/content/v1/59ef9a244c0dbf3814d94d38/1580762612906-BMFM6TLDZ8L03MC2R7WB/GK_Logotype.jpg?format=1500w" alt="" /></a>
                            </IconButton>
                            <Hidden lgDown>
                                {links.map((item) => (
                                    <Typography
                                        key={item.name}
                                        component="a"
                                        href={item.href}
                                        sx={{
                                            fontFamily: ['Roboto Mono', 'monospace'].join(','),
                                            color: '#2a4988',
                                            textDecoration: 'none',
                                            fontSize: '1.5em'
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                ))}
                            </Hidden>
                            <Hidden lgUp>
                                <IconButton>
                                    <MenuIcon onClick={() => setOpen(true)} />
                                </IconButton>
                            </Hidden>
                        </Toolbar>
                        <SwipeableDrawer anchor="right" open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                            <div>
                                <IconButton>
                                    <ChevronRightIcon onClick={() => setOpen(false)} />
                                </IconButton>
                            </div>
                            <Divider />
                            <List>
                                {links.map((item) => (
                                    <ListItem key={item.name} >
                                        <Typography
                                            key={item.name}
                                            component="a"
                                            href={item.href}
                                            sx={{
                                                fontFamily: ['Roboto Mono', 'monospace'].join(','),
                                                color: '#2a4988',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </SwipeableDrawer>
                    </AppBar>
                </Box>
                <Box className='content' style={{ flexGrow: 1 }}>
                    {props.children}
                </Box>
                <br />
                <br />
                <Paper className='footer' sx={{
                    backgroundColor: '#2a4988',
                    ml: '-8px',
                    padding: '5px',
                    marginTop: 'calc(10% + 60px)'
                    // position: 'fixed',
                    // bottom: 0 
                }}>
                    <Typography
                        sx={{
                            color: 'white',
                            fontFamily: ['Roboto Mono', 'monospace'].join(','),
                            fontSize: '20px'
                        }}
                    >
                        WE ARE GIVING KITCHEN.
                    </Typography>
                    <Typography
                        sx={{
                            color: 'white',
                            fontFamily: ['Roboto Mono', 'monospace'].join(','),
                            fontSize: '20px'
                        }}
                    >
                        WE HELP FOOD SERVICE WORKERS.
                    </Typography>
                    <Box className='footer-img' sx={{ 
                        backgroundColor: '#2a4988',
                        padding: '2px',
                        display: 'flex',
                        justifyContent: 'center',
                        // width: '100%'
                        // height: '20%'
                        }}>
                        <img src="https://images.squarespace-cdn.com/content/v1/59ef9a244c0dbf3814d94d38/1616001978701-3VRESJHXEYB8DXO7R9N4/award-logos.png?format=750w" alt="awards" />
                    </Box>
                </Paper>
            </div>
        </>
    )
}

export default BaseLayout
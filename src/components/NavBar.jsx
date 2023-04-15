import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AbcIcon from '@mui/icons-material/Abc';
import { Link } from "react-router-dom"
import { useLogOut } from '../hooks/useLogOut'
import { projectAuth } from "../firebase/config"
import { getAuth } from "firebase/auth";
import { isAdmin } from '../pages/Admin/isAdmin';


const pages = ['Reservations', 'About HUJI-INNOVATE', 'HUJI-Articles'];
// TODO: back & front - add a page to All Users Reservations
const adminSettingOption  = ['My Reservations', 'All Users Reservations', 'Approve New Users', 'Manage Users', 'Usage Report', 'Edit Rooms Settings', 'LogOut'];

import { useNavigate } from 'react-router';

export default function NavBar() {
    const { logOut } = useLogOut()
    const user = getAuth().currentUser
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    // const [settings, setSettings] = useState([]);
    // user && isAdmin() && setSettings(adminSettingOption)
    // user && !isAdmin() && setSettings(settingsOption)

    let settings = []
    if (user && isAdmin()) {settings = adminSettingOption}


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        console.log("1313")
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const routesDict = {
        'Reservations': '/',
        'About HUJI-INNOVATE': '/aboutUs',
        'HUJI-Articles' : '/articles',
        'All Users Reservations' : '/allReservations',
        'Approve New Users' : "/approveUsers",
        'Manage Users' : "/manageUsers",
    };
    const navigate  = useNavigate();

    return (
        <AppBar position="static" sx={{ backgroundColor: '#211D42' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters >
                    {/*<AbcIcon sx={{ display: { xs: 'none', md: 'flex' ,lg: 'flex'}, mr: 1 }} />*/}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Poppins',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        HUJI-Inoovate
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {user && pages.map((page) => (
                                <MenuItem key={page} >
                                    { page === 'Reservations' &&  <Typography textAlign="center"><Link to="/">{page}</Link></Typography>  }
                                    { page === 'About HUJI-INNOVATE' &&  <Typography textAlign="center"><Link to="/aboutUs">{page}</Link></Typography>  }
                                    { page === 'HUJI-Articles' && <Link to="/articles"> <Typography textAlign="center">{page}</Typography> </Link> }
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/*<AbcIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />*/}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {user && pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => navigate(routesDict[page])}
                                // to={`/${page}`} // Change this to the path of your page
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {isAdmin && <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Admin" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>}
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting}         onClick={() => navigate(routesDict[setting])}>
                                    {setting !== 'LogOut' && < Typography textAlign="center"> {setting}  </Typography>}
                                    { setting === 'LogOut' && <Button onClick={logOut}><Typography textAlign="left">{setting}</Typography></Button> }
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
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
import { useLogout } from '../hooks/useLogOut'
import { projectAuth } from "../firebase/config"
import { isAdmin } from '../pages/admin/isAdmin';

const pages = ['Book a Reservation', 'About HUJI-INNOVATE', 'HUJI-Articles'];
const settingsOption = ['Profile', 'My Reservations', 'Contact Us', 'LogOut'];
// TODO: back & front - add a page to All Users Reservations
const adminSettingOption  = ['Profile', 'My Reservations', 'All Users Reservations', 'Approve New Users', 'Manage Users', 'Usage Report', 'LogOut'];



export default function NavBar() {
    const { logout } = useLogout()
    const user = projectAuth.currentUser   
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    // const [settings, setSettings] = useState([]);
    // user && isAdmin() && setSettings(adminSettingOption) 
    // user && !isAdmin() && setSettings(settingsOption) 

    let settings = []
    if (user && isAdmin()) {settings = adminSettingOption}
    if (user && !isAdmin()) {settings = settingsOption}

    
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#211D42' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
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
                                    {/* <Typography textAlign="center">{page}</Typography>    
                                                                   */}
                                    {console.log("in pages map")}
                                    { page === 'Book a Reservation' &&  <Typography textAlign="center"><Link to="/">{page}</Link></Typography>  }
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
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Matan Chen" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
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
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                {/* <Typography textAlign="center">{setting}</Typography> */}
                                    { setting === 'My Reservations' && <Link to="/myReservations"> <Typography textAlign="center">{setting}</Typography> </Link> }
                                    { setting === 'All Users Reservations' && <Link to="/allReservations"> <Typography textAlign="center">{setting}</Typography> </Link> }    
                                    { setting === 'Contact Us' && <Link to="/contactUs"> <Typography textAlign="center">{setting}</Typography> </Link> }
                                    { setting === 'Approve New Users' && <Link to="/approveUsers"> <Typography textAlign="center">{setting}</Typography> </Link> }
                                    { setting === 'Manage Users' && <Link to="/manageUsers"> <Typography textAlign="center">{setting}</Typography> </Link> }
                                    { setting === 'LogOut' && <Button onClick={logout}><Typography textAlign="center">{setting}</Typography></Button> }                                    
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
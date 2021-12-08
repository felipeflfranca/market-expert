import React, {createContext} from 'react';
import Button from '@mui/material/Button';
import {makeStyles} from '@mui/styles';
import {
    AppBar,
    Box,
    Container, Grid,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const useStyles: any = makeStyles((theme?: any) => ({
    root: {
        height: '100vh',
        backgroundColor: '#f3f3f3'
    },
    logo: {
        height: '68px',
        padding: '17px',
        color: '#084270',
    },
    dashboard: {
        padding: '5em 1em 0 1em',
    }
}));

const pages = [
    {name: 'Ponto de venda', url: '/'}
];

const records = [
    {name: 'Tipo de produto', url: '/products'},
    {name: 'Produto', url: '/product/types'}
];

type AppContextType = {}

interface Props {
    children: any
}

export const AppContext = createContext({} as AppContextType)

export function AppProvider({children}: Props) {
    const classes = useStyles();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div className={classes.root}>
            <AppContext.Provider value={{}}>
                <AppBar position={'fixed'} color={'inherit'}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                                className={classes.logo}
                            >
                                Market Expert
                            </Typography>

                            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon/>
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
                                        display: {xs: 'block', md: 'none'},
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page.name}</Typography>
                                        </MenuItem>
                                    ))}
                                    {records.map((record) => (
                                        <MenuItem key={record.name} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{record.name}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ml: -4, flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                            >
                                Market Expert
                            </Typography>
                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                {pages.map((page) => (
                                    <Button
                                        key={page.name}
                                        onClick={handleCloseNavMenu}
                                        sx={{my: 2, display: 'block'}}
                                    >
                                        {page.name}
                                    </Button>
                                ))}
                            </Box>

                            <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                                {records.map((record) => (
                                    <Button
                                        key={record.name}
                                        onClick={handleCloseNavMenu}
                                        sx={{ml: 2, my: 2, display: 'block'}}
                                        variant={'outlined'}
                                    >
                                        {record.name}
                                    </Button>
                                ))}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>


                <Grid className={classes.dashboard}>
                    {children}
                </Grid>

            </AppContext.Provider>
        </div>
    )
}
import { ShoppingCart } from '@mui/icons-material'
import { AppBar, Toolbar, Typography, Switch, List, ListItem, IconButton, Badge, Box } from '@mui/material'
import { Link, NavLink, Navigate } from 'react-router-dom'
import { useStoreContext } from '../context/StoreContext'
import { useAppSelector } from '../store/configureStore'

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

interface Props {
    darkMode: boolean,
    themeChange: () => void
}

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

export const Header = ({ themeChange, darkMode }: Props) => {

    const {basket} = useAppSelector(state => state.basket);
    // const {basket} = useStoreContext();
    const itemCount = basket?.itemDtos.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>

                <Box display='flex' alignItems="center">
                    <Typography variant='h6' component={NavLink} to='/'
                        sx={navStyles}
                    >
                        Re-Store
                    </Typography>
                    <Switch checked={darkMode} color='secondary' onChange={themeChange} />

                </Box>


                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

                <Box display='flex' alignItems="center">
                    <IconButton component={Link} to='/basket' size='large' edge="start" color='inherit' sx={{ mr: 2 }}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart></ShoppingCart>
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

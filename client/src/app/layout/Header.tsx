import { AppBar, Toolbar, Typography , Switch} from '@mui/material'

interface Props {
    darkMode: boolean,
    themeChange : () => void
}

export const Header = ({themeChange, darkMode}: Props) => {
  return (
    <AppBar position='static' sx={{mb: 4}}>
        <Toolbar>
            <Typography variant='h6'>Re-Store</Typography>
            <Switch checked={darkMode} color='secondary' onChange={themeChange} />
        </Toolbar>
    </AppBar>
  )
}

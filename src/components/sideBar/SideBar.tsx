import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { NavLink } from 'react-router-dom';
import {Link,Box } from '@mui/material'
import classes from './SideBar.module.css'
import { styled } from '@mui/system';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    color : '#66718a',
    textDecoration: 'none',
    '&.active': {
      color: 'white',
      backgroundColor : '#283042'
    },
  }));

const SideBar = () => {
    return (
        <Box sx={{backgroundColor:'#0f1c3b',height:'100%',color:'#66718a'}}>
            <Toolbar sx={{backgroundColor:'white'}} />
            <Divider />
            <List>

                <ListItem>
                    DASHBOARD
                </ListItem>
                <ListItem >
                    <StyledNavLink to='/admin/country'>
                    <ListItemButton>
                        <ListItemIcon>
                            <PublicIcon sx={{color:'white'}} />
                        </ListItemIcon>
                        <ListItemText primary='Country' />
                    </ListItemButton>
                    </StyledNavLink>
                </ListItem>
                <ListItem>
                <StyledNavLink to='/admin/city'>
                    <ListItemButton>
                        <ListItemIcon>
                            <LocationCityIcon sx={{color:'white'}} />
                        </ListItemIcon>
                        <ListItemText primary='City' />
                    </ListItemButton>
                    </StyledNavLink>
                </ListItem>
            </List>
        </Box>
    );
}
export default SideBar

import Header from "../components/header/Header"
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import SideBar from "../components/sideBar/SideBar";
import { Route,Redirect,useLocation } from "react-router-dom";
import CountryData from "../components/CountryData";
import CityData from "../components/CityData";
import { ClassNames } from "@emotion/react";

const drawerWidth = 240;

const Admin = ()=>{
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    return (
        <React.Fragment>
        <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <Header openSideBar={handleDrawerToggle} />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={document.body}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <SideBar />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            <SideBar />
          </Drawer>
        </Box>
        {/* <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width:`calc(100% - ${drawerWidth}px)` }}
        //   sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
            <Route path='/Country'>
                <CountryData />
            </Route>
            <Route path='/City'>
                <CityData />
            </Route>
        </Box> */}
      </Box>
      </React.Fragment>
    )
}
export default Admin
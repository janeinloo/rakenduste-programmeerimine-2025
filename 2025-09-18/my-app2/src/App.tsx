import { useState } from "react"
import "./App.css"
import { Outlet, Link } from "react-router-dom"
import { AppBar, Toolbar, Typography,
  IconButton, Drawer, List,
  ListItemButton, ListItemText, Box
 } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';


export default function Layout() {
  const [open, setOpen] = useState(false)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{display: 'flex'}}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{mr:2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Minu Rakendus
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItemButton
              component={Link}
              to="/"
              onClick={toggleDrawer}
            >
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/about"
              onClick={toggleDrawer}
            >
              <ListItemText primary="About" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/something"
              onClick={toggleDrawer}
            >
              <ListItemText primary="Something" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
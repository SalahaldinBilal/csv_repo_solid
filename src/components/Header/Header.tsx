import styles from "./Header.module.scss";
import { Box, AppBar, Toolbar, Typography, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, List, ListSubheader, Button, Badge } from "@suid/material";
import MenuIcon from '@suid/icons-material/Menu';
import QuitIcon from '@suid/icons-material/PowerSettingsNew';
import { createSignal, For, onMount, Show } from "solid-js";
import SortablePageList from "./SortablePageList/SortablePageList";
import userData from "../../states/userData";

function Header() {
  const [showDrawer, setShowDraw] = createSignal(false);
  const { data, signOut } = userData;
  const navBarHeight = 36;

  const toggleDrawer = () => setShowDraw(show => !show)

  return (
    <>
      <Drawer
        anchor="left"
        open={showDrawer()}
        sx={{ zIndex: 9999 }}
        onClose={toggleDrawer}
      >
        <Box
          sx={{ width: 250, height: '100%' }}
          role="presentation"
        >
          <List disablePadding subheader={
            <ListSubheader component="div" sx={{ background: "none" }}>
              Pages
            </ListSubheader>
          } sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}>
            <SortablePageList />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <QuitIcon />
                </ListItemIcon>
                <ListItemText primary="Close" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar
            variant="dense"
            sx={{ padding: "0px!important", height: navBarHeight, minHeight: navBarHeight }}
          >
            <Button
              sx={{ mr: 2, minWidth: 10, width: navBarHeight, height: navBarHeight, borderRadius: 0, color: 'white' }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </Button>
            <Show when={data.loggedIn} fallback={<div>Please login or sign up</div>}>
              <div>Hello {data.username}</div>
            </Show>
            <Show when={data.loggedIn}>
              <Button onClick={signOut}>Sign out</Button>
            </Show>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Header;
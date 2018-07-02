import React, { Component, Fragment } from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  SwipeableDrawer,
  Typography,
  Hidden,
  MenuList,
  MenuItem,
  IconButton,
  CssBaseline,
  BottomNavigationAction,
  BottomNavigation
} from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";

import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/icons/Menu";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import HeaderLeftMenu from "./HeaderLeftMenu";
import * as routes from "../constants/routes";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  flex: { flex: 1 },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  bottomNav: {
    width: "100%",
    bottom: 0,
    position: "fixed"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class Layout extends Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  render() {
    const {
      classes,
      children,
      location: { pathname }
    } = this.props;
    const { mobileOpen } = this.state;

    const drawer = (
      <div>
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>
        <MenuList>
          <MenuItem
            component={Link}
            to={routes.HOME}
            selected={routes.HOME === pathname}
          >
            Home
          </MenuItem>
          <MenuItem
            component={Link}
            to={routes.ADMIN}
            selected={routes.ADMIN === pathname}
          >
            Admin
          </MenuItem>
        </MenuList>
      </div>
    );

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <Menu />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
                component={Link}
                to={routes.LANDING}
                style={{ textDecoration: "none", color: "unset" }}
              >
                Responsive UI
              </Typography>
              <HeaderLeftMenu />
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <SwipeableDrawer
              variant="temporary"
              onOpen={() => this.handleDrawerToggle()}
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              <div onClick={this.handleDrawerToggle}>{drawer}</div>
            </SwipeableDrawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
          <Hidden mdUp>
            <BottomNavigation
              value={0}
              // onChange={this.handleChange}
              showLabels
              className={classes.bottomNav}
            >
              <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            </BottomNavigation>
          </Hidden>
        </div>
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(Layout);

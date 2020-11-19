import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";

import { Link, withRouter } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},

	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

function Layout(props) {
	const {
		window,
		children,
		componentList,
		location: { pathname },
	} = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<Hidden smDown>
				<div className={classes.toolbar} />
			</Hidden>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<Avatar
					srs="https://avatars.dicebear.com/api/male/adas.svg"
					alt="avatar"
				/>
				<Typography>Add user info here</Typography>
			</div>

			<Divider />
			<List>
				{componentList.map((item, index) => (
					<ListItem
						component={Link}
						to={item.url}
						selected={item.url === pathname}
						button
						key={index}
					>
						<ListItemIcon>
							<item.icon />
						</ListItemIcon>
						<ListItemText primary={item.name} />
					</ListItem>
				))}
			</List>

			<Divider />
			<Button variant="contained" color="primary">
				LOG OUT
			</Button>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar position="absolute" className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							Optum's Shit
						</Typography>
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer} aria-label="mailbox folders">
					<Hidden smUp implementation="css">
						<Drawer
							container={container}
							variant="temporary"
							anchor={theme.direction === "rtl" ? "right" : "left"}
							open={mobileOpen}
							onClose={handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper,
							}}
							ModalProps={{
								keepMounted: true,
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Drawer
							classes={{
								paper: classes.drawerPaper,
							}}
							variant="permanent"
							open
						>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{children}
				</main>
			</div>
		</>
	);
}

Layout.propTypes = {
	window: PropTypes.func,
};

export default withRouter(Layout);

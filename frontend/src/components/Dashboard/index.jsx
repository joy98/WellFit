import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Careplans from "./Careplans";
import Encounters from "./Encounters";
import Observations from "./Observations";
import Medications from "./Medications";
import Conditions from "./Conditions";

import Axios from "axios";

import UserContext from "../../context/UserContext";
import { CssBaseline, Typography } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "90vh",
		overflow: "auto",
		margin: 0,
		padding: 0,
	},
	container: {
		// paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeight: {
		height: 240,
	},
}));

export default function Dashboard() {
	const { userData } = useContext(UserContext);

	const classes = useStyles();

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<main className={classes.content}>
			<CssBaseline />
			<div className={classes.appBarSpacer} />
			<Container maxWidth="lg" className={classes.container}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={8} lg={9}>
						<Paper className={fixedHeightPaper}></Paper>
					</Grid>

					<Grid item xs={12} md={4} lg={3}>
						<Paper className={fixedHeightPaper}>
							<Typography>
								Expenses:
								{userData.user && " " + userData.user.HEALTHCARE_EXPENSES}
							</Typography>
							<Typography>
								Coverage:
								{userData.user && " " + userData.user.HEALTHCARE_COVERAGE}
							</Typography>
						</Paper>
					</Grid>

					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Careplans userData={userData} />
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Encounters userData={userData} />
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Conditions userData={userData} />
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Medications userData={userData} />
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Observations userData={userData} />
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Medications userData={userData} />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}

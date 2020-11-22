import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Squats from "./Squats";

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: "relative",
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	root: {
		maxWidth: 245,
	},
	media: {
		height: 245,
		width: 245,
	},
	rootDiv: {
		padding: theme.spacing(2),
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function Exercise() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.rootDiv}>
			<Card className={classes.root}>
				<CardActionArea onClick={handleClickOpen}>
					<CardMedia
						className={classes.media}
						image={require("../../assets/squat.svg")}
						title="squat"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							Do Squats
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							A squat is a strength exercise in which the trainee lowers their
							hips from a standing position and then stands back up
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar} color="secondary">
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							Sound
						</Typography>
						<Button autoFocus color="inherit" onClick={handleClose}>
							save
						</Button>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>

				<Squats open={open} />
			</Dialog>
		</div>
	);
}

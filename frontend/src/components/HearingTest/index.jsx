import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		width: "50%",
		// alignItems: "center",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
});

export default function HearingTest() {
	const classes = useStyles();
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				if (oldProgress === 100) {
					return 0;
				}
				const diff = 1;
				return Math.min(oldProgress + diff, 100);
			});
		}, 500);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className={classes.root}>
			<LinearProgress variant="determinate" value={progress} />
			<Button color="primary">aiodk</Button>
		</div>
	);
}

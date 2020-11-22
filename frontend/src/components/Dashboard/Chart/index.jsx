import React, { useEffect, useState } from "react";

import Axios from "axios";
import { LineChart, Line } from "recharts";
import { Paper, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	container: {
		padding: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	paperContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	graph: {
		paddingTop: 20,
		paddingBottom: 20,
	},
}));

export default function Chart({ userData }) {
	const classes = useStyles();
	const [rows, setRows] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		if (userData.user) {
			Axios.get(`get-observations-by-patient-id/${userData.user.Id}`).then(
				(res) => {
					let newRows = [];
					for (let i in res.data) {
						newRows.push(res.data[i]);
					}

					console.log(res.data);
					setRows(newRows);
				}
			);
		}
	}, [userData]);

	function getDate(dateObj) {
		return (
			dateObj.getDate() +
			"/" +
			dateObj.getMonth() +
			"/" +
			dateObj.getFullYear()
		).toString();
	}

	useEffect(() => {
		let newData = [];
		for (const row of rows) {
			if (row.DESCRIPTION === "Body Weight") {
				let dateObj = new Date(row.DATE);
				newData.push({
					date: getDate(dateObj),
					"Body Weight": row.VALUE,
				});
			}
		}
		setData(newData);
	}, [rows]);

	return (
		<div id="chart-container">
			<Paper className={classes.container}>
				<Typography variant="h5">Body Weight</Typography>
				<div className={classes.paperContainer}>
					<LineChart
						className={classes.graph}
						width={686}
						height={100}
						data={data}
					>
						<Line
							type="monotone"
							dataKey="Body Weight"
							stroke="#8884d8"
							strokeWidth={3}
						/>
					</LineChart>
				</div>
				<Typography>See a doctor</Typography>
			</Paper>
			<Paper className={classes.container}>
				<Typography variant="h5">Body Weight</Typography>
				<div className={classes.paperContainer}>
					<LineChart
						className={classes.graph}
						width={686}
						height={100}
						data={data}
					>
						<Line
							type="monotone"
							dataKey="Body Weight"
							stroke="#8884d8"
							strokeWidth={3}
						/>
					</LineChart>
				</div>
				<Typography>See a doctor</Typography>
			</Paper>
			<Paper className={classes.container}>
				<Typography variant="h5">Body Weight</Typography>
				<div className={classes.paperContainer}>
					<LineChart
						className={classes.graph}
						width={686}
						height={100}
						data={data}
					>
						<Line
							type="monotone"
							dataKey="Body Weight"
							stroke="#8884d8"
							strokeWidth={3}
						/>
					</LineChart>
				</div>
				<Typography>See a doctor</Typography>
			</Paper>
		</div>
	);
}

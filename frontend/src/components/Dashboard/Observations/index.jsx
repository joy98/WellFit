import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import { TableRow, Typography } from "@material-ui/core";

import Axios from "axios";

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(3),
	},
}));

export default function Observations({ userData }) {
	const classes = useStyles();

	const [rows, setRows] = useState([]);

	useEffect(() => {
		if (userData.user) {
			Axios.get(`get-observations-by-patient-id/${userData.user.Id}`).then(
				(res) => {
					console.log(res.data);
					let newRows = [];
					for (let i in res.data) {
						newRows.push(res.data[i]);
					}
					setRows(newRows);
				}
			);
		}
	}, [userData]);

	return (
		<React.Fragment>
			<Typography component="h2" variant="h6" color="primary" gutterBottom>
				Your Observations {rows.length > 0 ? `(${rows.length})` : ""}
			</Typography>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Description</TableCell>
						<TableCell>Value</TableCell>
						<TableCell>Units</TableCell>
						{/* <TableCell align="right">Type</TableCell> */}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, idx) => (
						<TableRow key={idx}>
							<TableCell>{row.DATE}</TableCell>
							<TableCell>{row.DESCRIPTION}</TableCell>
							<TableCell>{row.VALUE}</TableCell>
							<TableCell>{row.UNITS}</TableCell>
							{/* <TableCell align="right">{row.TYPE}</TableCell> */}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className={classes.seeMore} />
		</React.Fragment>
	);
}
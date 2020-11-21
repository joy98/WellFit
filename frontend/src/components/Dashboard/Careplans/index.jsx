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

export default function Orders({ userData }) {
	const classes = useStyles();

	const [rows, setRows] = useState([]);

	useEffect(() => {
		if (userData.user) {
			Axios.get(`get-careplans-by-patient-id/${userData.user.Id}`).then(
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
				Your Careplans
			</Typography>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Start date</TableCell>
						<TableCell>Stop date</TableCell>
						<TableCell>Description</TableCell>
						<TableCell>Code</TableCell>
						<TableCell align="right">Reason Description</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, idx) => (
						<TableRow key={idx}>
							<TableCell>{row.START}</TableCell>
							<TableCell>{row.STOP}</TableCell>
							<TableCell>{row.DESCRIPTION}</TableCell>
							<TableCell>{row.CODE}</TableCell>
							<TableCell align="right">{row.REASONDESCRIPTION}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className={classes.seeMore} />
		</React.Fragment>
	);
}

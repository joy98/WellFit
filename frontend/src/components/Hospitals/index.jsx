import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Select, Typography } from "@material-ui/core";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexWrap: "wrap",
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	cardMedia: {
		paddingTop: "56.25%", // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
}));

const diseases = [
	"Influenza  seasonal  injectable  preservative free",
	"Td (adult) preservative free",
	"Hep B  adult",
	"meningococcal MCV4P",
	"Hep A  adult",
	"Hep B  adolescent or pediatric",
	"Hib (PRP-OMP)",
	"rotavirus  monovalent",
	"IPV",
	"DTaP",
	"Pneumococcal conjugate PCV 13",
	"Tdap",
	"HPV  quadrivalent",
	"varicella",
	"MMR",
	"Hep A  ped/adol  2 dose",
	"zoster",
	"pneumococcal polysaccharide vaccine  23 valent",
];

export default function DialogSelect() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [diseaseIndex, setDiseaseIndex] = React.useState("");
	const [hospitalList, setHospitalList] = React.useState([]);
	const [selectedDisease, setSelectedDisease] = React.useState("");

	const handleChange = (event) => {
		setDiseaseIndex(Number(event.target.value) || "");
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		if (diseases[diseaseIndex]) {
			setSelectedDisease(diseases[diseaseIndex]);
			axios
				.post("get-hospitals-by-disease-name", {
					disease: diseases[diseaseIndex],
				})
				.then((res) => {
					let newdata = [];
					for (const da of res.data) {
						newdata.push(da);
					}

					newdata.sort(function (a, b) {
						return a.BASE_COST - b.BASE_COST;
					});
					setHospitalList(newdata);
				});
		}
		setOpen(false);
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					padding: 50,
				}}
			>
				<div>
					<Button color="secondary" onClick={handleClickOpen}>
						Select Disease
					</Button>
					<br />
					<Typography>
						Selected: {selectedDisease === "" ? "None" : selectedDisease}
					</Typography>
				</div>
				<Dialog
					disableBackdropClick
					disableEscapeKeyDown
					open={open}
					onClose={handleClose}
				>
					<DialogTitle>Select Disease</DialogTitle>
					<DialogContent>
						<form className={classes.container}>
							<FormControl className={classes.formControl}>
								<InputLabel id="demo-dialog-select-label">Disease</InputLabel>
								<Select
									labelId="demo-dialog-select-label"
									id="demo-dialog-select"
									value={diseaseIndex}
									onChange={handleChange}
									input={<Input />}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{diseases.map((item, key) => {
										return (
											<MenuItem key={key} value={key}>
												{item}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={handleClose} color="primary">
							Ok
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{hospitalList.length > 0 ? (
					<main style={{ height: "100vh", overflow: "auto" }}>
						<Container className={classes.cardGrid} maxWidth="md">
							<Grid container spacing={4}>
								{hospitalList.length > 0 &&
									hospitalList.map((card, idx) => (
										<Grid item key={idx} xs={12} sm={6} md={4}>
											<Card className={classes.card}>
												<CardMedia
													className={classes.cardMedia}
													image="https://source.unsplash.com/random"
													title="Image title"
												/>
												<CardContent className={classes.cardContent}>
													<Typography gutterBottom variant="h5" component="h2">
														{card.NAME}
													</Typography>
													<Typography variant="body1">
														{card.ADDRESS},
														<br />
														{card.CITY},
														<br />
														{card.STATE},
														<br />
														{card.ZIP},
														<br />
														{card.PHONE}
													</Typography>
													<br />

													<Typography variant="body2">
														Base: <strong>{card.BASE_COST.toFixed(2)}</strong>
														<br />
														Base Encounter cost:{" "}
														<strong>{card.BASE_ENCOUNTER_COST}</strong>
														<br />
														Total claim cost:{" "}
														<strong>{card.TOTAL_CLAIM_COST}</strong>
														<br />
														Payer coverage:{" "}
														<strong>{card.PAYER_COVERAGE}</strong>
													</Typography>
												</CardContent>
											</Card>
										</Grid>
									))}
							</Grid>
						</Container>
					</main>
				) : (
					<Typography variant="h2">Select disease to see hospitals</Typography>
				)}
			</div>
		</>
	);
}

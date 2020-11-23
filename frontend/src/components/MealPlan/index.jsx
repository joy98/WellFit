import React, { useEffect } from "react";
import axios from "axios";

import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";
import MealPlanCards from "./MealPlanCards";

const mealsList = [
	"Eggs",
	"Salmon",
	"Vegetables",
	"Beef",
	"Chicken",
	"Boiled Potatoes",
	"Tuna",
	"Beans and Legumes",
	"Soups",
	"Cottage Cheese",
	"Avocado",
	"Nut",
	"Fruit",
	"Grapefruit",
	"Yogurt",
	"Seafood",
	"Meat",
	"Pasta",
	"Rice",
	"Cereal",
	"Bread",
];

export default function MealPlan() {
	const classes = useStyles();

	const APP_ID = "36afd93c";
	const APP_KEY = "2370df71755a998111926ab26fa97a42";

	const [fetchedData, setFetchedData] = React.useState([]);
	const [randomMeals, setRandomMeals] = React.useState([]);
	const [searchMeal, setSearchMeal] = React.useState("");

	function getRandom(arr, n) {
		var result = new Array(n),
			len = arr.length,
			taken = new Array(len);
		if (n > len)
			throw new RangeError("getRandom: more elements taken than available");
		while (n--) {
			var x = Math.floor(Math.random() * len);
			result[n] = arr[x in taken ? taken[x] : x];
			taken[x] = --len in taken ? taken[len] : len;
		}
		return result;
	}

	function searchMealFromAPI(input) {
		input = input.toLowerCase();

		const URL = `https://api.edamam.com/api/food-database/parser?nutrition-type=logging
									&app_id=${APP_ID}
									&app_key=${APP_KEY}
									&ingr=${input}
									&healt=alcohol-free
									&healt=celery-free
									&healt=crustacean-free`;
		axios
			.get(URL)
			.then((res) => {
				console.log(res.data);
				let newDatas = [];
				for (const d of res.data.hints) {
					let gg = d;
					gg.price = Math.floor(Math.random() * 200 + 50);
					newDatas.push(gg);
				}
				setFetchedData(newDatas);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	useEffect(() => {
		setRandomMeals(getRandom(mealsList, 5));
	}, []);

	useEffect(() => {
		console.log(fetchedData);
	}, [fetchedData]);

	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					padding: 50,
				}}
			>
				<Paper className={classes.root}>
					<InputBase
						className={classes.input}
						placeholder="Search Food"
						inputProps={{ "aria-label": "search food" }}
						onChange={(e) => setSearchMeal(e.target.value)}
						value={searchMeal}
					/>
					<IconButton
						type="submit"
						className={classes.iconButton}
						aria-label="search"
						onClick={() => searchMealFromAPI(searchMeal)}
					>
						<SearchIcon />
					</IconButton>
				</Paper>
				<div>
					{randomMeals.map((item, idx) => {
						return (
							<Button
								color="secondary"
								variant="outlined"
								style={{ margin: 10 }}
								key={idx}
								onClick={() => {
									setSearchMeal(item.toString());
									searchMealFromAPI(item);
								}}
							>
								{item}
							</Button>
						);
					})}
				</div>
			</div>
			<MealPlanCards fetchedData={fetchedData} />
		</>
	);
}

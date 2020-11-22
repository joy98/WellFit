import Axios from "axios";
import React, { useState, useEffect } from "react";
import { IonApp } from "@ionic/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HearingIcon from "@material-ui/icons/Hearing";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";

import Layout from "./layout";
import Home from "./pages/Home";
import Signin from "./pages/SignIn";
import Exercise from "./components/Exercise";
import Dashboard from "./components/Dashboard";
import Hospitals from "./components/Hospitals";
import HearingTest from "./components/HearingTest";

import UserContext from "./context/UserContext";
import { ProtectedRoute } from "./protected";

function About() {
	return (
		<>
			<h1>about</h1>
		</>
	);
}

const componentList = [
	{
		name: "Dashboard",
		url: "/",
		component: Dashboard,
		icon: DashboardIcon,
	},
	{
		name: "Meal Plan",
		url: "/meal-plan",
		component: About,
		icon: FastfoodIcon,
	},
	{
		name: "Hearing Test",
		url: "/hearing-test",
		component: HearingTest,
		icon: HearingIcon,
	},
	{
		name: "Delivery Cooking",
		url: "/delivery-cooking",
		component: About,
		icon: ShoppingCartIcon,
	},
	{
		name: "Exercise",
		url: "/exercise",
		component: Exercise,
		icon: AccessibilityNewIcon,
	},
	{
		name: "Hospitals",
		url: "/hospitals",
		component: Hospitals,
		icon: LocalHospitalIcon,
	},
];

const App = () => {
	const [userData, setUserData] = useState({
		token: undefined,
		user: undefined,
	});

	const checkLoggedIn = async () => {
		let token = localStorage.getItem("auth-token");
		if (token === null) {
			localStorage.setItem("auth-token", "");
			token = "";
		}
		const tokenRes = await Axios.post("is-token-valid", null, {
			headers: { "x-auth-token": token },
		});

		if (tokenRes.data) {
			const userRes = await Axios.get("get-current-patient", {
				headers: { "x-auth-token": token },
			});

			setUserData({
				token: token,
				user: userRes.data,
			});
		}
	};

	useEffect(() => {
		checkLoggedIn();
	}, []);

	return (
		<IonApp>
			<CssBaseline />
			<UserContext.Provider value={{ userData, setUserData }}>
				<BrowserRouter>
					<Switch>
						<Route
							path="/signin"
							exact
							render={(props) => <Signin {...props} />}
						/>
						<Layout componentList={componentList}>
							{componentList.map((item, key) => (
								<ProtectedRoute
									path={item.url}
									key={key}
									exact={true}
									component={item.component}
								/>
							))}
						</Layout>
					</Switch>
				</BrowserRouter>
			</UserContext.Provider>
		</IonApp>
	);
};

export default App;

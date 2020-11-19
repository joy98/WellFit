import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import MailIcon from "@material-ui/icons/Mail";

import Layout from "./layout";
import HearingTest from "./components/HearingTest";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccessibleIcon from "@material-ui/icons/Accessible";
import HearingIcon from "@material-ui/icons/Hearing";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";

import { IonApp } from "@ionic/react";

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
		url: "/dashboard",
		component: Home,
		icon: DashboardIcon,
	},
	{
		name: "Meal Plan",
		url: "/meal-plan",
		component: About,
		icon: FastfoodIcon,
	},
	{
		name: "Mobility assistance",
		url: "/mobility-assistance",
		component: About,
		icon: AccessibleIcon,
	},
	{
		name: "Hearing Test",
		url: "/hearing-test",
		component: HearingTest,
		icon: HearingIcon,
	},
	{
		name: "Eye Test",
		url: "/eye-test",
		component: About,
		icon: VisibilityIcon,
	},
	{
		name: "Delivery Cooking",
		url: "/delivery-cooking",
		component: About,
		icon: ShoppingCartIcon,
	},
	{
		name: "Forum",
		url: "/forum",
		component: About,
		icon: SpeakerNotesIcon,
	},
];

const App = () => (
	<IonApp>
		<CssBaseline />
		<BrowserRouter>
			<Layout componentList={componentList}>
				<Switch>
					{componentList.map((item, key) => (
						<Route
							path={item.url}
							key={key}
							exact={true}
							render={(props) => <item.component {...props} />}
						/>
					))}
				</Switch>
			</Layout>
		</BrowserRouter>
	</IonApp>
);

export default App;

import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

import "./Home.css";

const Home: React.FC = () => {
	return (
		<>
			{/* <IonHeader>
				<IonToolbar>
					<IonTitle>Blank</IonTitle>
				</IonToolbar>
			</IonHeader> */}
			<IonContent>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Blank</IonTitle>
					</IonToolbar>
				</IonHeader>
				<h1>nigga</h1>
			</IonContent>
		</>
	);
};

export default Home;

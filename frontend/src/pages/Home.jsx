import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get("/get-allergies")
			.then((response) => {
				let newdata = [];

				for (let i in response.data) {
					newdata.push(response.data[i]);
				}

				setData(newdata);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<div>
			{data &&
				data.map((item, key) => {
					return (
						<div key={key}>
							<h1>{item.FIRST}</h1>
						</div>
					);
				})}
		</div>
	);
};

export default Home;

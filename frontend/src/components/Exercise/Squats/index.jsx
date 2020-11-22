import React, { useState, useCallback, useEffect, useRef } from "react";
import "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";

import { List, CircularProgress } from "@material-ui/core";

const URL = "https://teachablemachine.withgoogle.com/models/QJYOZCCFV/";
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";

let model, webcam, ctx, labelContainer, maxPredictions;

export default function Squat({ open }) {
	const canvasRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);

	const predict = useCallback(async () => {
		const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
		const prediction = await model.predict(posenetOutput);

		for (let i = 0; i < maxPredictions; i++) {
			const classPrediction =
				prediction[i].className + ": " + prediction[i].probability.toFixed(2);
			labelContainer.childNodes[i].innerHTML = classPrediction;
		}

		drawPose(pose);
	}, []);

	const loop = useCallback(
		async (timestamp) => {
			webcam.update();
			await predict();
			window.requestAnimationFrame(loop);
		},
		[predict]
	);

	function drawPose(pose) {
		if (webcam.canvas) {
			ctx.drawImage(webcam.canvas, 0, 0);
			if (pose) {
				const minPartConfidence = 0.5;
				tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
				tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
			}
		}
	}

	const init = React.useCallback(async () => {
		setIsLoading(true);
		try {
			model = await tmPose.load(modelURL, metadataURL);
			maxPredictions = model.getTotalClasses();

			const size = document.getElementById("gg-container").clientHeight - 200;
			const flip = true;
			webcam = new tmPose.Webcam(size, size, flip);
			await webcam.setup();
			await webcam.play();
			window.requestAnimationFrame(loop);

			const canvas = canvasRef.current;
			canvas.width = size;
			canvas.height = size;
			ctx = canvas.getContext("2d");
			labelContainer = document.getElementById("label-container");
			for (let i = 0; i < maxPredictions; i++) {
				labelContainer.appendChild(document.createElement("div"));
			}
			setIsLoading(false);
		} catch (err) {
			console.error(err);
			setIsLoading(false);
		}
	}, [loop]);

	useEffect(() => {
		if (open) init();
		if (!open)
			return () => {
				if (webcam) webcam.stop();
			};
	}, [open, init]);

	return (
		<List id="gg-container" style={{ height: "100%" }}>
			{isLoading && <CircularProgress color="secondary" />}
			<div>
				<canvas ref={canvasRef} id="canvas" />
			</div>
			<div id="label-container" />
		</List>
	);
}

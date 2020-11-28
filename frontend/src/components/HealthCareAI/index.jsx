import React, { useState } from "react";
import {
	Container,
	IconButton,
	Paper,
	Typography,
	InputBase,
} from "@material-ui/core";
import { InsertEmoticon, Send } from "@material-ui/icons";

import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";

import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

import "./Chat.css";

import Axios from "axios";

const Chat = ({ history }) => {
	const { transcript, resetTranscript } = useSpeechRecognition();
	const [isListening, setIsListening] = useState(false);
	const [message, setMessage] = useState("");

	const [messageList, setMessageList] = useState([
		{
			msg: "Please tell me what symptoms do u have ?",
			isUser: false,
		},
	]);

	const URL = "http://127.0.0.1:5000/";
	const RESET_ALL = () => {
		history.push("/disease-prediction");
	};

	React.useEffect(() => {
		let newMessageList = [];
		for (const msg of messageList) {
			newMessageList.push(msg);
		}
		if (messageList.length === 4) {
			Axios.get(URL + "get-symptom-version").then((res) => {
				let newversions = "";
				for (const ver of res.data.versions) {
					console.log(ver);
					newversions += ver.toString() + "\n";
				}

				newMessageList.push({
					msg: newversions,
					isUser: false,
				});
				setMessageList(newMessageList);
				setMessage("");
			});
		}
	}, [messageList]);

	const sendMessage = (event) => {
		event.preventDefault();

		let newMessageList = [];
		for (const msg of messageList) {
			newMessageList.push(msg);
		}

		//step 1
		if (messageList.length === 1) {
			Axios.post(URL + "verify-symptom-name", {
				name: message,
			}).then((res) => {
				console.log(res.data);
				// if (res.data.value === 1) {
				newMessageList.push({
					msg: message,
					isUser: true,
				});
				newMessageList.push({
					msg: "days ?",
					isUser: false,
				});
				// }
				setMessageList(newMessageList);
				setMessage("");
			});
		}
		// step 2
		else if (messageList.length === 3) {
			Axios.post(URL + "verify-symptom-days", {
				day: message,
			}).then((res) => {
				newMessageList.push({
					msg: message,
					isUser: true,
				});
				setMessageList(newMessageList);
				setMessage("");
			});
		}
	};

	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		console.log(resetTranscript);
		return null;
	}

	return (
		<div className="container">
			<div className="chat">
				<div className="chat__body">
					{messageList.map((item, key) => {
						return (
							<div
								key={key}
								style={{
									border: `${item.isUser ? "1px solid blue" : "1px solid red"}`,
								}}
								className={`chat__message ${item.isUser && "chat__reciever"}`}
							>
								<p>
									<span
									// variant="subtitle2"
									// className="chat__name"
									>
										{item.isUser ? "Avi" : "Bot"}
									</span>
									{item.msg}
									<span className="chat__timestamp">3:26pm</span>
								</p>
							</div>
						);
					})}
				</div>

				<div>
					<div style={{ display: "flex" }}>
						<IconButton
							color="secondary"
							style={{ marginLeft: "auto", marginRight: "auto" }}
							onMouseDown={() => {
								setIsListening(true);
								SpeechRecognition.startListening();
							}}
							onMouseUp={() => {
								SpeechRecognition.stopListening();
								setIsListening(false);
							}}
						>
							{!isListening ? (
								<MicIcon fontSize="large" />
							) : (
								<MicOffIcon fontSize="large" />
							)}
						</IconButton>
					</div>
					<div style={{ display: "flex" }}>
						<InputBase
							disabled
							style={{ marginLeft: "auto", marginRight: "auto" }}
							placeholder="Say somthing to mic"
							type="text"
							value={transcript}
						/>
					</div>
					<Container
						maxWidth="xl"
						style={{
							display: "flex",
							paddingTop: 0,
							paddingBottom: 0,
							paddingLeft: 10,
							paddingRight: 10,
						}}
						className="chat__footer"
					>
						<InsertEmoticon />
						<form>
							<InputBase
								style={{
									flex: 1,
									paddingTop: 0,
									paddingBottom: 0,
									paddingLeft: 10,
									paddingRight: 10,
									borderRadius: "30px",
								}}
								placeholder="Enter a msg"
								onChange={(e) => {
									setMessage(e.target.value);
								}}
								type="text"
								value={message}
							/>

							<button onClick={sendMessage}></button>
						</form>
						<IconButton disabled={!message} onClick={sendMessage}>
							<Send />
						</IconButton>
					</Container>
				</div>
			</div>
		</div>
	);
};

export default Chat;

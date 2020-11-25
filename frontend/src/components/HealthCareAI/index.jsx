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

const chats = [
	1,
	2,
	32,
	4,
	4,
	1,
	45,
	5,
	4,
	6,
	46,
	12,
	1,
	31,
	3,
	1,
	431,
	31,
	31,
];

const Chat = () => {
	const { transcript, resetTranscript } = useSpeechRecognition();
	const [isListening, setIsListening] = useState(false);
	const [message, setMessage] = useState("");

	const sendMessage = (event) => {
		event.preventDefault();
		console.log(message);
		setMessage("");
	};

	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		console.log(resetTranscript);
		return null;
	}

	return (
		<div className="container">
			<div className="chat">
				<div className="chat__body">
					<Paper
						style={{ border: "1px solid red" }}
						className={`chat__message ${false && "chat__reciever"}`}
					>
						<Typography>
							<Typography variant="subtitle2" className="chat__name">
								AI
							</Typography>
							some msg
							<span className="chat__timestamp">3:26pm</span>
						</Typography>
					</Paper>
					{chats.map((item, key) => {
						return (
							<Paper
								style={{ border: "1px solid blue" }}
								className={`chat__message ${true && "chat__reciever"}`}
							>
								<Typography>
									<Typography variant="subtitle2" className="chat__name">
										Avi
									</Typography>
									some msg
									<span className="chat__timestamp">3:26pm</span>
								</Typography>
							</Paper>
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

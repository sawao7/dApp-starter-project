import React from "react";
import { ethers } from "ethers";
import "./App.css";
import { asyncAct } from "@testing-library/react/dist/act-compat";

export default function App() {
	const [currentAccount, setCurrentAccount] = React.useState("");
	console.log("currentAccount:", currentAccount);

	const checkIfWalletIsConnected = async () => {
		try {
			const { ethereum } = window;
			if (!ethereum) {
				console.log("Make sure you have Metamask!");
			} else {
				console.log("We have the ethereum object", ethereum);
			}

			const accounts = await ethereum.request({ method: "eth_accounts" });
			if (accounts.length !== 0) {
				const account = accounts[0];
				console.log("Found an authorized account : ", account);
				setCurrentAccount(account);
			} else {
				console.log("No authorized account found");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const connectWallet = async () => {
		try {
			const { ethereum } = window;
			if (!ethereum) {
				alert("Get Metamask!");
				return;
			}
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			console.log("Connected : ", accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}
	};

	React.useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	const wave = () => {};

	return (
		<div className="mainContainer">
			<div className="dataContainer">
				<div className="header">
					<span role="img" aria-label="hand-wave">
						👋
					</span>{" "}
					WELCOME!
				</div>

				<div className="bio">
					イーサリアムウォレットを接続して、メッセージを作成したら、
					<span role="img" aria-label="hand-wave">
						👋
					</span>
					を送ってください
					<span role="img" aria-label="shine">
						✨
					</span>
				</div>

				<button className="waveButton" onClick={wave}>
					Wave at Me
				</button>
				{!currentAccount && (
					<button className="waveButton" onClick={connectWallet}>
						Connect Wallet
					</button>
				)}
				{currentAccount && (
					<button className="waveButton" onClick={connectWallet}>
						Wallet Connected
					</button>
				)}
			</div>
		</div>
	);
}

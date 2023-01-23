
import { useEffect, useRef, useState } from 'react';

import styles from './app.module.scss';
import web3 from './provider/web3';
import lottery from './provider/lottery';

type Info = {
	manager: string;
	account: string;
	totalPlayers: number;
	balance: string;
}

const App: React.FC = () => {

	const inputAmountRef = useRef<HTMLInputElement>(null);
	const inputNameRef = useRef<HTMLInputElement>(null);
	const [info, setInfo] = useState<Info>();
	const [status, setStatus] = useState<string>('');
	const [result, setResult] = useState<string>('');

  useEffect(() => {
    getInfo();
  });

	async function getInfo() {
		const account = await web3.eth.getAccounts();
		const manager = await lottery.methods.manager().call();
		const players = await lottery.methods.getPlayers().call();
		const balance = await web3.eth.getBalance(lottery.options.address);

		setInfo({
			manager,
			balance,
			account: account[0],
			totalPlayers: players.length,
		});
	}

	async function onSubmit(event: React.FormEvent) {
		event.preventDefault();
		setStatus('Waiting on transaction success...')
		const name = inputNameRef.current?.value;
		const amount = inputAmountRef.current?.value;
		const accounts = await web3.eth.getAccounts();
		await lottery.methods.enter(name).send({
			from: accounts[0],
			value: web3.utils.toWei(`${amount}`, 'ether'),
		});
		setStatus('You have been entered!');
	}

	async function pickWinner() {
		setResult('Waiting on transaction success...');
		const accounts = await web3.eth.getAccounts();
		await lottery.methods.pickWinner().send({
			from: accounts[0]
		});
		setResult('A winner has been picked!');
	}

  return (
    <main className={styles.container}>
			<div>
				<h2>Lottery Contract</h2>
				<p>This contract is managed by {info?.manager}</p>
				<p>
					There are currently {info?.totalPlayers} people entered, competing to win 
					{` ${web3.utils.fromWei(info?.balance || '0', 'ether')}`} ether!
				</p>
			</div>

			<hr />

			<form className={styles.form} onSubmit={onSubmit}>
				<h4>Want to try your luck?</h4>
				<div>
					<label>Your name:</label>
					<input ref={inputNameRef} />
					<label>Amount of ether to enter:</label>
					<input ref={inputAmountRef} type='number' min='0.11' />
					<button type='submit'>Enter</button>
				</div>
			</form>
			{status && (
				<div className={styles.load}>
					<span>{status}</span>
				</div>
			)}

			<hr />
			
			<div className={styles.admin}>
				<div>
					<h4>Ready to pick a winner?</h4>
					<h6>Only admin</h6>
				</div>
				<button onClick={pickWinner}>
					Pick a winner!
				</button>
			</div>
			{result && (
				<div className={styles.load}>
					<span>{result}</span>
				</div>
			)}
		</main>
  );
}

export default App

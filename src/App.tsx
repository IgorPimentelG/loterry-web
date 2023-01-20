
import { useEffect, useState } from 'react';

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

	const [info, setInfo] = useState<Info>();

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

  return (
    <main className={styles.container}>
			<div>
				<h2>Lottery Contract</h2>
				<p>This contract is managed by {info?.manager}</p>
				<p>There are currently {info?.totalPlayers} people entered, competing to win {web3.utils.fromWei(info?.balance || '0', 'ether')} ether!</p>
			</div>
		</main>
  );
}

export default App

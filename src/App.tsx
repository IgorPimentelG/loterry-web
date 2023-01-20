
import { useEffect } from 'react';
import web3 from './provider/web3';

const App: React.FC = () => {

  useEffect(() => {
    web3.eth.getAccounts().then(console.log);
  });

  return (
    <div></div>
  );
}

export default App

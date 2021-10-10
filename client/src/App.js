import React, { Component } from "react";
import TamaNFT from "./contracts/TamaNFT.json";
import Web3 from "web3";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TandC from "./TandC.js"
import Main from "./Main.js"

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, balanceOf: 0, totalSupply: 0, maxMint: 0, price: 0, loading:false, connected: false };

  componentDidMount = async () => {
    let account = "";
    if (window.ethereum) {
      account = await window.ethereum.request({ method: 'eth_accounts' });
      account = account[0]
    }
    else if (window.web3) {
      account = await window.web3.getAccounts();
      account = account[0]
    }

    if (account) {
      this.setState({loading: true})
      this.setState({connected: true})
      await this.loadWeb3()
      await this.loadBlockchainData()
    }

  };

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  connect = async () => {
    await this.loadWeb3()
    await this.loadBlockchainData()
    window.location.reload()
  }

  loadBlockchainData = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await window.web3;

      // Use web3 to get the user's accounts.
      let account = await web3.eth.getAccounts();
      account = account[0].toLowerCase();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TamaNFT.networks[networkId];
      const instance = new web3.eth.Contract(
        TamaNFT.abi,
        deployedNetwork && deployedNetwork.address,
      );

      let balanceOf = await instance.methods.balanceOf(account).call();
      let totalSupply = await instance.methods.totalSupply().call();
      let maxMint = await instance.methods.MAX_MINT().call();
      let price = await instance.methods.price().call();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, account, contract: instance, balanceOf, totalSupply, maxMint, price, connected: true, loading: false });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Wrong network, change to Ethereum Mainnet in your wallet.`,
      );
      console.error(error);
    }
  }

  mint = async () => {
    try {
      let mintAmount = document.getElementById("mint-amount").value;
      await this.state.contract.methods.mint(mintAmount).send({from: this.state.account, value: this.state.price*mintAmount});
    } catch (error) {
      alert("Transaction Rejected")
    }

  }

  render() {
    if (!this.state.loading) {
      return (
      <div>
        <Router>
          <Switch>
            <div>
            <nav className="navbar navbar-dark flex-md-nowrap p-0 shadow">
              <a
                className="navbar-brand col-sm-3 mr-0"
                href="/"
                rel="noopener noreferrer"
              >
                <img class="App-logo" src="TAMA Monster Club - LOGO.png" alt="app-logo"/>
              </a>
              <div id='user-info'>
                <a href="/#mint-section" class="nav-button"><strong>MINT</strong></a>
                <a href="/#the-club" class="nav-button"><strong>THE CLUB</strong></a>
                <a href="/#roadmap" class="nav-button"><strong>ROADMAP</strong></a>
                <a href="/tandc" class="nav-button"><strong>T&C</strong></a>
                <a href="https://twitter.com/TAMAmonsterclub"><svg focusable="false" data-prefix="fab" data-icon="twitter" class="svg-inline--fa fa-twitter fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg></a>
                <a href="https://discord.gg/uGb7SNEHVd"><svg focusable="false" data-prefix="fab" data-icon="discord" class="svg-inline--fa fa-discord fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path></svg></a>
                <a href="https://www.instagram.com/tamamonsterclub/"><svg focusable="false" data-prefix="fab" data-icon="instagram" class="svg-inline--fa fa-instagram fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></a>
              </div>
            </nav>
            <Route exact path='/'>
              <Main web3={this.state.web3} account={this.state.account} networkId={this.state.networkdId} ipfs={this.state.ipfs} mint={this.mint} connect={this.connect} balanceOf={this.state.balanceOf} totalSupply={this.state.totalSupply} maxMint={this.state.maxMint} price={this.state.price} contract={this.state.contract} connected={this.state.connected} />
            </Route>
            <Route exact path='/tandc'>
              <TandC web3={this.state.web3} account={this.state.account} networkId={this.state.networkdId} kclInstance={this.state.kclInstance} ipfs={this.state.ipfs} />
            </Route>
            </div>
          </Switch>
        </Router> 
     
    </div>
    );
  } else {
    return(<div class="loader"></div>);
  }
}
}

export default App;

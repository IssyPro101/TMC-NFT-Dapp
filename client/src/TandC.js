import React, { Component } from "react";

import "./App.css";


class TandC extends Component {

  state = { };

  componentDidMount = async () => {

  };

  render() {
      return (
        <div className="App">
          <h2 id="tc-title">Terms and Conditions</h2>
          <p id="term-text">
          TAMA Monster Club’s website is only an interface allowing participants to exchange digital collectibles (NFTs) on the Ethereum blockchain. Each user is responsible for keeping their wallet address safe. As the transaction are taking place on the Ethereum blockchain, there is no possibility to undo, reverse, or restore any transactions.<br/><br/>

Everything on this website and all its connected services are provided ‘as is’ and ‘as available’, without any warranty of any kind. By using this website, you are accepting sole responsibility for all transactions involving TAMA Monster Club digital collectibles.<br/><br/>

You are the owner of the NFT that you purchase. For as long as you own your TAMA Monster Club NFT, we will never remove, seize, modify, or take away your ownership. It’s yours, forever. <br/><br/>

We give ourselves the right to at any point and time stop the development of the smart contract without any specific reason.<br/><br/>
          </p>
        </div>

      );
  }
}

export default TandC;

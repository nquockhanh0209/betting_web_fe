import React from "react";
import Web3 from "web3";
import {
  Betting_contract,
  Betting_address,
  Token_abi,
  token_address,
} from "../contracts/smc";
// import env from "react-dotenv";
const { ethereum } = window;
const web3 = new Web3(Web3.givenProvider);

async function CallBetLoseContract(value) {
  const account = await ethereum.request({
    method: "eth_requestAccounts",
  });

  console.log(account);
  var amount = web3.utils.toWei(value, "ether");
  const approve_token = new web3.eth.Contract(Token_abi, token_address);
  await approve_token.methods.approve(Betting_address, amount).send({
    from: account[0],
  });
  
  const betting_lose = new web3.eth.Contract(Betting_contract, Betting_address);
  await betting_lose.methods.addUserBetLose(amount).send({
    from: account[0],
  });
}
async function CallBetWinContract(value) {
  
  const account = await ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log(account);
  var amount = web3.utils.toWei(value, "ether");
  const approve_token = new web3.eth.Contract(Token_abi, token_address);
  await approve_token.methods.approve(Betting_address, amount).send({
    from: account[0],
  });
  
  const betting_lose = new web3.eth.Contract(Betting_contract, Betting_address);
  await betting_lose.methods.addUserBetWin(amount).send({
    from: account[0],
  });
}
async function CallBetDrawContract(value) {
  
  const account = await ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log(account);
  var amount = web3.utils.toWei(value, "ether");
  const approve_token = new web3.eth.Contract(Token_abi, token_address);
  await approve_token.methods.approve(Betting_address, amount).send({
    from: account[0],
  });
  
  const betting_lose = new web3.eth.Contract(Betting_contract, Betting_address);
  await betting_lose.methods.addUserBetDraw(amount).send({
    from: account[0],
  });
}

export class Betting_Lose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
    };

    this.setAmount = this.setAmount.bind(this);
    // this.setMatchInfo = this.setMatchInfo.bind(this);
  }
  setAmount(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      amount: value,
    });
  }

  render() {
    return (
      <div className="Popup" id="Popup">
        {/* <div onClick={toggle} className="overlay"></div> */}
        <div className="Popup_content">
          {/* <Link  className="close_Popup">
	&times;
	</Link> */}
          <div className="Bet_Infomation">
            <p className="bet_title">Please enter the bets</p>
            <input
              type="text"
              className="bet"
              id="bet"
              value={this.state.amount}
              onChange={this.setAmount}
            />
          </div>
          <button
            className="bet_lose"
            onClick={async () => {
              await CallBetLoseContract(this.state.amount);
            }}
          >
            BET
          </button>
        </div>
      </div>
    );
  }
}
export class Betting_Win extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
    };

    this.setAmount = this.setAmount.bind(this);
    // this.setMatchInfo = this.setMatchInfo.bind(this);
  }
  setAmount(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      amount: value,
    });
  }

  render() {
    return (
      <div className="Popup" id="Popup">
        {/* <div onClick={toggle} className="overlay"></div> */}
        <div className="Popup_content">
          {/* <Link  className="close_Popup">
	&times;
	</Link> */}
          <div className="Bet_Infomation">
            <p className="bet_title">Please enter the bets</p>
            <input
              type="text"
              className="bet"
              id="bet"
              value={this.state.amount}
              onChange={this.setAmount}
            />
          </div>
          <button
            className="bet_lose"
            onClick={async () => {
              await CallBetWinContract(this.state.amount);
            }}
          >
            BET
          </button>
        </div>
      </div>
    );
  }
}
export class Betting_Draw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
    };

    this.setAmount = this.setAmount.bind(this);
    // this.setMatchInfo = this.setMatchInfo.bind(this);
  }
  setAmount(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      amount: value,
    });
  }

  render() {
    return (
      <div className="Popup" id="Popup">
        {/* <div onClick={toggle} className="overlay"></div> */}
        <div className="Popup_content">
          {/* <Link  className="close_Popup">
	&times;
	</Link> */}
          <div className="Bet_Infomation">
            <p className="bet_title">Please enter the bets</p>
            <input
              type="text"
              className="bet"
              id="bet"
              value={this.state.amount}
              onChange={this.setAmount}
            />
          </div>
          <button
            className="bet_lose"
            onClick={async () => {
              await CallBetDrawContract(this.state.amount);
            }}
          >
            BET
          </button>
        </div>
      </div>
    );
  }
}
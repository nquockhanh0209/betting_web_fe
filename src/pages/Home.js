import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Web3 from "web3";
import Barca from "../assets/images/Barca.png";
import Real_Madrid from "../assets/images/Real_Madrid.png";
import Logo_Youg from "../assets/images/Logo_Youg.jpg";
import "../assets/css/home.css";

import axios from "axios";

import {
  Betting_contract,
  matchContract,
  Token_abi,
  token_address,
} from "../contracts/smc";
const { ethereum } = window;
const web3 = new Web3(Web3.givenProvider);
async function CallBetLoseContract(matchContract, value) {
  const account = await ethereum.request({
    method: "eth_requestAccounts",
  });

  console.log(account);
  var amount = web3.utils.toWei(value, "ether");
  const approve_token = new web3.eth.Contract(Token_abi, token_address);
  await approve_token.methods.approve(matchContract, amount).send({
    from: account[0],
    gasLimit:500000
  });

  const betting_lose = new web3.eth.Contract(Betting_contract, matchContract);
  await betting_lose.methods.addUserBetLose(amount).send({
    from: account[0],
    gasLimit:500000
  });
}
async function CallBetWinContract(matchContract, value) {
  const account = await ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log(account);
  var amount = web3.utils.toWei(value, "ether");
  const approve_token = new web3.eth.Contract(Token_abi, token_address);
  await approve_token.methods.approve(matchContract, amount).send({
    from: account[0],
    gasLimit:500000
  });

  const betting_lose = new web3.eth.Contract(Betting_contract, matchContract);
  await betting_lose.methods.addUserBetWin(amount).send({
    from: account[0],
    gasLimit:500000
  });
}
async function CallBetDrawContract(matchContract, value) {
  const account = await ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log(account);
  var amount = web3.utils.toWei(value, "ether");
  const approve_token = new web3.eth.Contract(Token_abi, token_address);
  await approve_token.methods.approve(matchContract, amount).send({
    from: account[0],
    gasLimit:500000
  });

  const betting_lose = new web3.eth.Contract(Betting_contract, matchContract);
  await betting_lose.methods.addUserBetDraw(amount).send({
    from: account[0],
    gasLimit:500000
  });
}
async function callBet(type, matchContract, value) {
  if (type === "win") {
    await CallBetWinContract(matchContract, value);
  } else if (type === "draw") {
    await CallBetDrawContract(matchContract, value);
  } else if (type === "lose") {
    await CallBetLoseContract(matchContract, value);
  }
}

const Home = () => {
  var [isLoading, SetIsLoading] = useState(true);
  var [matchInfo, SetMatchInfo] = useState([]);
  var [balance, setBalance] = useState("");
  var [connect, setConnect] = useState("Connect Wallet");
  var [account, setAccount] = useState("");
  var [betBoxInfo, setBetBoxInfo] = useState([]);
  //var [amount, setAmount] = useState([]);
  //var betBoxInfo = [];
  var amount=[];
  async function connect_wallet(event) {
    if(ethereum){
      const account = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (account[0] == 0x984dcc8d8306eb60bb4e8739944c121897d93712) {
        window.location = "/match";
      } else {
        sessionStorage.setItem("account", account[0]);
        var accountSession = sessionStorage.getItem("account");
        setConnect(accountSession);
        setAccount(account[0]);
        getBalance();
      }
    }
    else{
      window.location= "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
      
    }  
  }
  async function getBalance() {
    const account = await ethereum.request({
      method: "eth_requestAccounts",
    });

    const token_contract = new web3.eth.Contract(Token_abi, token_address);
    var accountBalance = await token_contract.methods
      .balanceOf(account[0])
      .call();
    var eth_amount = web3.utils.fromWei(accountBalance, "ether");
    console.log(eth_amount);
    setBalance(eth_amount);
  }
  var deleteBox = (betBoxInfo_delete) => {
    console.log(111111);
    var tmp_arr = [...betBoxInfo];
    var index = tmp_arr.indexOf(betBoxInfo_delete);
    if (index !== -1) {

      tmp_arr.splice(index);
      setBetBoxInfo(tmp_arr);
    }
  };
  useEffect(() => {
    const getMatchInfo = async () => {
      await axios.get("http://localhost:3000/matchInfo/getNow").then(
        async (res) => {
          const dataLocal = res.data;
          SetMatchInfo(dataLocal);

          SetIsLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
    };
    if (isLoading) {
      getMatchInfo();
      if (sessionStorage.getItem("account")) {
        setConnect(sessionStorage.getItem("account"));
      }
      
      // setBetBoxInfo(...betBoxInfo,
      //   {
      //     matchFormat: "",
      //      matchName:  "",

      //      team1Name: "",
      //      team2Name: "",
      //      matchBetWinProportion: 1.9,
      //      matchBetDrawProportion: 2,
      //      matchBetLoseProportion: 2.3,

      //   }
      // )
      console.log(betBoxInfo);
    }
  }, [isLoading]);

  function addNewBetBox(event, matchInfo) {
    event.preventDefault();
    //console.log(JSON.parse(matchInfo));
    setBetBoxInfo((betBoxInfo) => [...betBoxInfo, matchInfo]);

    //betBoxInfo.push(matchInfo);
    console.log(betBoxInfo);
  }
  function addBetBoxToSession(matchInfo) {
    sessionStorage.setItem("bet_box_info", betBoxInfo);
  }
  return (
    <div className="container-fluid">
      <div className="Header_1">
        <div className="row">
          <div className="Menu">
            <Link to={"/home"}>
              <img src={Logo_Youg} width="160px" alt="description of" />
            </Link>
          </div>

          <Link class="anchor_Menu" to={"/endMatch"}>
            End Matches
          </Link>

          <Link class="anchor_Menu" to={"https://cakhia-tv.site/"}>
            Live Matches
          </Link>

          <div className="Connect">
            <button
              className="wallet"
              name="wallet_icon"
              onClick={(e) => {
                if (connect === "Connect Wallet") {
                  connect_wallet();
                }
              }}
            >
              {connect}
            </button>
          </div>
        </div>
      </div>
      <div className="Content">
        <div className="Main_Content">
          <div className="row">
            <div className="Background">
              <div className="r_match">
                {matchInfo?.map((info, index) => (
                  <div className="Match" key={info._id}>
                    <div className="Infomation">
                      {/* <div className="row"> */}
                      <div className="Title">
                        {matchInfo[index]?.matchFormat}
                      </div>
                      <div className="Time">
                        {new Date(
                          matchInfo[index]?.matchStartDate
                        ).toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                        /
                        <br />
                        {moment(matchInfo[index]?.matchStartDate).fromNow()}
                      </div>
                    </div>
                    {/* </div> */}
                    <div className="Team">
                      <div className="row">
                        <div className="Team_1">
                          <div className="row" >
                          <div className="name_team_one">
                          <span className="Team_one">
                            {matchInfo[index]?.team1Name}
                          </span>
                            </div>
                          <div className="img_team_one">
                          <img
                            className="team_logo"
                            src={matchInfo[index]?.team1Img}
                            alt="description of "
                          />
                          </div>
                        </div>
                        </div>
                        <div className="shift" >
                          <span> - </span>
                        </div>
                        
                        <div className="Team_2">
                        <div className="row" >
                          <div className="img_team_two">
                            <img
                              className="team_logo"
                              src={matchInfo[index]?.team2Img}
                              alt="description of "
                            />
                          </div>

                          <div className="name_team_two">
                            <span href="#" className="Team_two">
                              {matchInfo[index]?.team2Name}
                            </span>
                          </div>
                          
                          
                        </div>
                        </div>
                      </div>
                    </div>

                    <Link
                      class="match_contract"
                      to={
                        "https://goerli.etherscan.io/address/" +
                        matchInfo[index]?.matchContract
                      }
                    >
                      Contract Address
                    </Link>

                    <div className="Bet_Box">
                      <div className="row">
                        <div className="Bet_1 Bet">
                          <div className="option_1">
                            <button
                              className="value"
                              onClick={(event) => {
                                addNewBetBox(event, {
                                  teamDisplay: matchInfo[index].team1Name,
                                  team1Name: matchInfo[index].team1Name,
                                  team2Name: matchInfo[index].team2Name,
                                  betType: "win",
                                  betProportion:
                                    matchInfo[index].matchBetWinProportion
                                      .$numberDecimal,
                                  matchContract: matchInfo[index].matchContract,
                                  amount: "",
                                });
                              }}
                            >
                              <span className="number"> 1 </span>{" "}
                              {
                                matchInfo[index]?.matchBetWinProportion
                                  .$numberDecimal
                              }
                            </button>
                          </div>
                        </div>
                        <div className="Bet_2 Bet">
                          <div className="option_2">
                            <button
                              className="value"
                              onClick={(event) => {
                                addNewBetBox(event, {
                                  teamDisplay: "Draw",
                                  team1Name: matchInfo[index].team1Name,
                                  team2Name: matchInfo[index].team2Name,
                                  betType: "draw",
                                  betProportion:
                                    matchInfo[index].matchBetDrawProportion
                                      .$numberDecimal,
                                  matchContract: matchInfo[index].matchContract,
                                  amount: "",
                                });
                              }}
                            >
                              <span className="number"> X </span>{" "}
                              {
                                matchInfo[index]?.matchBetDrawProportion
                                  .$numberDecimal
                              }
                            </button>
                          </div>
                        </div>
                        <div className="Bet_3 Bet">
                          <div className="option_3">
                            <button
                              className="value"
                              onClick={(event) => {
                                addNewBetBox(event, {
                                  teamDisplay: matchInfo[index].team2Name,
                                  team1Name: matchInfo[index].team1Name,
                                  team2Name: matchInfo[index].team2Name,
                                  betType: "lose",
                                  betProportion:
                                    matchInfo[index].matchBetLoseProportion
                                      .$numberDecimal,
                                  matchContract: matchInfo[index].matchContract,
                                  amount: "",
                                });
                              }}
                            >
                              <span className="number"> 2 </span>{" "}
                              {
                                matchInfo[index]?.matchBetLoseProportion
                                  .$numberDecimal
                              }
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div class="Bet_Menu">
              <div class="Bet_Box">
                <input type="checkbox" id="check" onClick={getBalance} />
                <label for="check">
                  <i class="fas fa-bars" id="btn"></i>
                  <i class="fas fa-times close_button" id="close"></i>
                </label>
                <div class="Balance_Box">
                  <div class="Balance">
                    <h4 className="bet-slip">BALANCE</h4>
                  </div>
                  <div class="Main_Bet_Box">
                    <div class="Background_bet_box">
                      <div class="Single">
                        <p className="my-bet">{balance}</p>
                        {/* <div class="close_button"> */}

                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Bet_Slip_Box">
                  <div class="Bet_Slip">
                    <h4 className="bet-slip">Bet Slip</h4>
                  </div>
                  {betBoxInfo.map(
                    (bet_box, index) =>
                    <div>
                      <div class="Main_Bet_Box" >
                        <div class="Background_bet_box">
                          <div class="Single">
                            <p className="my-bet">My Bets</p>
                            <div class="close_button">
                              <button
                                class="fas fa-times close_button"
                                onClick={(event) => {
                                  deleteBox(betBoxInfo[index])
                                }}
                              ></button>
                            </div>
                          </div>
                          <div class="Bet_Match">
                            <p class="team_name">
                              {betBoxInfo[index].teamDisplay}
                            </p>
                            <p class="bet_proportion">
                              {betBoxInfo[index].betProportion}
                            </p>
                          </div>

                          <div class="Game_detail">
                            <p>Match Result</p>
                          </div>
                          <div class="Number_value">
                            <p className="match-name">
                              {betBoxInfo[index].team1Name}-
                              {betBoxInfo[index].team2Name}
                            </p>

                            <input
                              className="bet-number"
                              type="number"
                              step="any"
                              min="0"
                              placeholder="Stake"
                              value={amount[index]}
                              onChange={(event) => {
                                amount[index] = event.target.value
                                console.log(event.target.value);
                                console.log(amount[index]);
                                
                              }}
                            />
                          </div>
                          <div className="buttonBet">
                            <button
                              className="bet"
                              onClick={async () => {
                                
                                await callBet(
                                  betBoxInfo[index].betType,
                                  betBoxInfo[index].matchContract,
                                  amount[index]
                                );
                              }}
                            >
                              {" "}
                              Bet
                            </button>
                          </div>
                          <hr />
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

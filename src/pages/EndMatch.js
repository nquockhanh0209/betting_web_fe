import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Web3 from "web3";
import Barca from "../assets/images/Barca.png";
import Real_Madrid from "../assets/images/Real_Madrid.png";
import Logo_Youg from "../assets/images/Logo_Youg.jpg";
import { Betting_contract } from "../contracts/smc";
import { Betting_Lose, Betting_Draw, Betting_Win } from "./Betting";
import "../assets/css/home.css";
import axios from "axios";
import { ethers } from "ethers";
import { Token_abi, token_address } from "../contracts/smc.js";

const { ethereum } = window;
const web3 = new Web3(Web3.givenProvider);

const EndMatch = () => {
  var [isLoading, SetIsLoading] = useState(true);
  var [matchInfo, SetMatchInfo] = useState([]);
  var [balance, setBalance] = useState("");
  var [connect, setConnect] = useState("Connect Wallet");
  var [account, setAccount] = useState("");
  async function connect_wallet(event) {
    if(account){
        setConnect(account[0]);
    } 
    else{
    const account = await ethereum.request({
      method: "eth_requestAccounts",
    });
    addDataIntoCache("Account", "https://localhost:8000", {
      account: account[0],
    });
    setConnect(account[0]);
    setAccount(account[0]);
    }
  }
  async function getCacheAccount() {
    var url = "https://localhost:8000";
    const cacheStorage = await caches.open("Account");
    const cachedResponse = await cacheStorage.match(url);

    if (cachedResponse) {
      var data = await cachedResponse.json();
      console.log(data);
      setConnect(data.account);
    }
  }
  async function getCacheAccount(){
    var url = 'https://localhost:8000'
    const cacheStorage = await caches.open('Account');
    const cachedResponse = await cacheStorage.match(url);
    
    if(cachedResponse){
      var data = await cachedResponse.json()
      
      setConnect(data.account);
    }
    
  }
  async function getBalance(event) {
    const account = await ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(account[0]);
    const token_contract = new web3.eth.Contract(Token_abi, token_address);
    var accountBalance = await token_contract.methods
      .balanceOf(connect)
      .call();
    var eth_amount = web3.utils.fromWei(accountBalance, "ether");
    console.log(eth_amount);
    setBalance(eth_amount);
  }
const addDataIntoCache = (cacheName, url, response) => {
    // Converting our response into Actual Response form
    const data = new Response(JSON.stringify(response));
    console.log(data);
    if ("caches" in window) {
      // Opening given cache and putting our data into it

      caches.open(cacheName).then((cache) => {
        cache.put(url, data);
      });
    }
  };
  useEffect(() => {
    const getMatchInfo = async () => {
      await axios.get("http://localhost:3000/matchInfo/getPast").then(
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
   getCacheAccount();
    
    }
  }, [isLoading]);

  return (
    <div className="container-fluid">
      <div className="Header_1">
        <div className="row">
          <div className="Menu">
            <div className="Sidebar_component">
             <input type="checkbox" id="check" onClick={getBalance} />
              <label for="check">
                <i class="fas fa-bars" id="btn"></i>
                <i class="fas fa-times" id="close"></i>
              </label>

              
            </div>
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
              onClick={(e)=>{if(connect == "Connect Wallet"){connect_wallet()}}}
            >
              {connect}
            </button>
          </div>
        </div>
      </div>
      <div className="Content">
        <div className="Main_Content">
          <div className="Background">
            <div className="r_match">
              {matchInfo?.map((info, index) => (
                <div className="Match" key={info._id}>
                  <div className="Infomation">
                    <Link href="#">
                      <Link href="#" className="Title">
                        {matchInfo[index]?.matchFormat}
                      </Link>
                      <Link href="#" className="Time">
                        {new Date(
                          matchInfo[index]?.matchStartDate
                        ).toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                        / {moment(matchInfo[index]?.matchStartDate).fromNow()}
                      </Link>
                    </Link>
                  </div>
                  <div className="Team">
                    <div className="row">
                      <div className="Team_1">
                        <span className="Team_one">
                          {matchInfo[index]?.team1Name}
                        </span>
                        <img
                          className="team_logo"
                          src={matchInfo[index]?.team1Img}
                          alt="description of "
                        />
                      </div>
                      <span> - </span>
                      <div className="Team_2">
                        <img
                          className="team_logo"
                          src={matchInfo[index]?.team2Img}
                          alt="description of "
                        />
                        <span href="#" className="Team_two">
                          {matchInfo[index]?.team2Name}
                        </span>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>
                  <div className="Result">
                    <div className="line"></div>
                    <span className="Match_Result">
                      {matchInfo[index]?.matchResult}
                    </span>
                    <div className="line"></div>
                  </div>
                  <br/>
                  <br/>
                  <br/>
                  <Link class="match_contract" to={"https://goerli.etherscan.io/address/"+matchInfo[index]?.matchContract}>
                      Contract Address
                      
                    </Link>
                  <div className="Bet_Box">
                    <div className="row">
                      <div className="Bet_1 Bet">
                        <div className="option_1">
                          <button className="value">
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
                          <button className="value">
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
                          <button className="value">
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
        </div>
      </div>
    </div>
  );
};

export default EndMatch;

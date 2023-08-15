import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import Web3 from "web3";
import {
  Betting_contract,
  matchContract,
  Token_abi,
  token_address,
} from "../contracts/smc";
import Home from "./Home";
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
  });

  const betting_lose = new web3.eth.Contract(Betting_contract, matchContract);
  await betting_lose.methods.addUserBetLose(amount).send({
    from: account[0],
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
  });

  const betting_lose = new web3.eth.Contract(Betting_contract, matchContract);
  await betting_lose.methods.addUserBetWin(amount).send({
    from: account[0],
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
  });

  const betting_lose = new web3.eth.Contract(Betting_contract, matchContract);
  await betting_lose.methods.addUserBetDraw(amount).send({
    from: account[0],
  });
}
export default async function callBet(type, matchContract,value){
  if(type === "win"){
    await CallBetWinContract(matchContract, value);
  }
  else if(type === "draw"){
    await CallBetDrawContract(matchContract, value);
  }
  else if(type === "lose"){
    await CallBetLoseContract(matchContract, value);
  }
}

// const BetBox = (props) => {
//   var [amount, setAmount] = useState("");
  
  
  
//   return (
//     <div>
//       <div class="Main_Bet_Box">
//         <div class="Background_bet_box">
//           <div class="Single">
//             <p className="my-bet">My Bets</p>
//             <div class="close_button">
//               <button class="fas fa-times close_button" onClick={(event)=>{
//                 props.data.delete
//               }}></button>
//             </div>
//           </div>
//           <div class="Bet_Match">
//             <p class="team_name">{props.data.matchInfo.team1Name}</p>
//             <p class="bet_proportion">{props.data.matchInfo.betProportion}</p>
//           </div>

//           <div class="Game_detail">
//             <p>Match Result</p>
//           </div>
//           <div class="Number_value">
//             <p className="match-name">
//               {props.data.matchInfo.team1Name}-{props.data.matchInfo.team2Name}
//             </p>
           
//             <input
//               className="bet-number"
//               type="number"
//               step="any"
//               min="0"
//               placeholder="Stake"
//               value={amount}
//               onChange={(event) => {
//                 setAmount(event.target.value);
//               }
                
//               }
              
//             />
            
            
//           </div>
//           <div className="buttonBet"><button className="bet" onClick={async ()=>{
              
//               await callBet(props.data.matchInfo.betType, props.data.matchInfo.matchContract, amount)
//             }}> Bet</button></div>
//           <hr />
//         </div>
//       </div>
//     </div>
//   );
// };

//export default BetBox;

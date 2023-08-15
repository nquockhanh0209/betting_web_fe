import React from "react";
import env from "react-dotenv";
import { ethers } from "ethers";
import { CF_contract } from "../contracts/smc.js";
const connectSMC = async ({ CONTRACT_ABI_SM, CONTRACT_ADDRESS_SM, signer }) => {
    try {

        return new ethers.Contract(CONTRACT_ADDRESS_SM, CONTRACT_ABI_SM, signer)

    } catch (error) {
        throw new Error(error.message);
    }
}
const createMatchContract = async () => {
    var new_address;
  try {
    const options = {
      CONTRACT_ABI_SM: CF_contract,
      CONTRACT_ADDRESS_SM: env.CLONEFACTORY_ADDRESS,
      signer: new ethers.Wallet(env.DEV_PRIVATE_KEY, env.GOERLI_URL),
    };
    const contract = await connectSMC(options);
    console.log("call smc clone factory success");
    const txn = await contract.creatClone(env.BETTINGSTORAGE_CONTRACT_ADDRESS);
    const rc = await txn.wait(); // 0ms, as tx is already confirmed
    const event = rc.events.find(event => event.event === 'CreateClone');
    const new_address = event.args;   
    console.log(new_address);
  } catch (error) {
    console.log(error);
  }
  return new_address;}

export default createMatchContract; 

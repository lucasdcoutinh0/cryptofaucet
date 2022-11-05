import css from "./Connected.module.css";
import REAL_DIGITAL_ABI from "../contracts/REAL_DIGITAL_ABI.json";
import { ethers } from "ethers";
import { useState, useEffect, Suspense } from "react";
import Routes from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Connected = (account: any) => {
  const [balance, setBalance] = useState("");
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    "0x433d03965414D4E3C62e1e28C884502BfccE2429",
    REAL_DIGITAL_ABI,
    signer
  );

  async function getBalance() {
    const balance = await contract.balanceOf(account.account[0]);
    setBalance(balance.toString());
  }

  async function checkNetwork() {
    const network = await provider.getNetwork();
    if (network.chainId !== 5) {
      alert("Please connect to Görli testnet and refresh the page");
    } else {
      getBalance();
    }
  }

  async function mintTokens() {
    const mint = await contract.mint(user, amount);
    const id = toast.loading("Please wait...");
    const tx = await mint.wait();
    toast.update(id, {
      render: "Transaction Completed",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "success",
      isLoading: false,
    });
  }

  useEffect(() => {
    checkNetwork();
  }, []);

  return (
    <div className={css.container}>
      <ToastContainer />
      <div className={css.box}>
        <h1 className={css.title}>BRLD Faucet</h1>
        <h2 className={css.subtitle}>
          Account:{" "}
          <Suspense fallback="Loading...">{account.account[0]}</Suspense>
        </h2>
        <h2 className={css.text}>Balance: {balance}</h2>
        <div className={css.actionContainer}>
          <h2 className={css.text}>Mint Tokens</h2>
          <input
            className={css.input}
            onChange={(e) => {
              setUser(e.target.value);
            }}
            placeholder="Account to recieve tokens"
          />
          <input
            className={css.input}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            placeholder="Amount of tokens to mint"
          />
          <button
            className={css.button}
            onClick={() => {
              mintTokens();
            }}
          >
            Mint
          </button>
        </div>
      </div>
    </div>
  );
};

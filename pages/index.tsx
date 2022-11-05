import Head from "next/head";
import { useState } from "react";
import { Connected } from "../components/Connected";

export default function Home() {
  const [userAccount, setUserAccount] = useState("");
  async function connectWallet() {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      setUserAccount(
        await window.ethereum.request({ method: "eth_requestAccounts" })
      );
    } else {
      alert("Please install MetaMask");
    }
  }
  return (
    <div className="main">
      <Head>
        <title>Create Next App</title>
        <meta name="Cryptocurrency" content="Cryptocurrency" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {userAccount !== "" ? (
          <Connected account={userAccount} />
        ) : (
          <button onClick={() => connectWallet()} className="button">
            Connect
          </button>
        )}
      </div>
    </div>
  );
}

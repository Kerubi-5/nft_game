import Head from "next/head";
import s from "@styles/Home.module.css";
import { useEffect, useState } from "react";
import { Button } from "@components/ui";
import { Layout } from "@components/common";

const Home = () => {
  // State
  const [currentAccount, setCurrentAccount] = useState(null);

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else if (ethereum.request) {
        console.log("We have the ethereum object", ethereum);

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Implement your connectWallet method here
   */
  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
       * Fancy method to request access to account.
       */

      if (ethereum.request) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        /*
         * Boom! This should print out public address once we authorize Metamask.
         */
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
      } else {
        alert("inaction");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className={s.root}>
      <Head>
        <title className="underline">Home</title>
      </Head>
      <h1>Start of App</h1>
      <div className={s.container}>
        <Button onClick={connectWalletAction}>Connect to Metamask</Button>
      </div>
    </div>
  );
};

Home.Layout = Layout;

export default Home;

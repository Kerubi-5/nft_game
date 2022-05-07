import Head from "next/head";
import s from "@styles/Home.module.css";
import { useEffect, useState } from "react";
import { Button, Container } from "@components/ui";
import { Layout } from "@components/common";
import { useUI } from "@components/ui/context";
import { SelectCharacter } from "@components/game";
import { transformCharacterData } from "@utils/normalize";

const Home = () => {
  const {
    wallet,
    characterNFT,
    gameContract,
    setCharacterNFT,
    checkWallet,
    connectWallet,
  } = useUI();

  const checkNetwork = async () => {
    try {
      if ((window as any).ethereum.networkVersion !== "4") {
        alert("Please connect to Rinkeby!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCharacter = async () => {
    if (wallet) {
      const txn = await gameContract!.checkIfUserHasNFT();

      if (txn.name) {
        console.log("User has character NFT");
        setCharacterNFT(transformCharacterData(txn));
      } else {
        console.log("No character NFT found");
      }
    }
  };

  // Check if user has metamask
  useEffect(() => {
    checkWallet();
  }, []);

  // Check if connected to rinkeby
  useEffect(() => {
    checkNetwork();
  }, []);

  // Fetch user owned character
  useEffect(() => {
    fetchCharacter();
  }, []);

  return (
    <div className={s.root}>
      <Head>
        <title>Home</title>
      </Head>

      <Container>
        <div className={s.title}>
          <h1 className={s.text}>Marvelverse</h1>
        </div>

        <div className="my-5 text-center">
          {wallet && characterNFT ? (
            <Button onClick={connectWallet}>Connect Wallet</Button>
          ) : (
            <SelectCharacter />
          )}
        </div>
      </Container>
    </div>
  );
};

Home.Layout = Layout;

export default Home;

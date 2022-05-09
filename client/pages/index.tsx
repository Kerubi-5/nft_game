import Head from "next/head";
import s from "@styles/Home.module.css";
import { useEffect, useState } from "react";
import { Button, Container } from "@components/ui";
import { Layout } from "@components/common";
import { useUI } from "@components/ui/context";
import { SelectCharacter } from "@components/game";
import { transformCharacterData } from "@utils/normalize";
import Arena from "@components/game/Arena/Arena";

const Home = () => {
  const { wallet, characterNFT, characters, connectWallet } = useUI();

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
          {wallet && characters ? (
            characterNFT ? (
              <Arena character={characterNFT} />
            ) : (
              <SelectCharacter />
            )
          ) : (
            <Button onClick={connectWallet}>Connect Wallet</Button>
          )}
        </div>
      </Container>
    </div>
  );
};

Home.Layout = Layout;

export default Home;

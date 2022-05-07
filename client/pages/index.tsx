import Head from "next/head";
import s from "@styles/Home.module.css";
import { useEffect } from "react";
import { Button, Container } from "@components/ui";
import { Layout } from "@components/common";
import { useUI } from "@components/ui/context";

const Home = () => {
  const { wallet, checkWallet, connectWallet } = useUI();
  useEffect(() => {
    checkWallet();
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

        <div>
          <Button onClick={connectWallet}>Connect Wallet</Button>
        </div>
      </Container>
    </div>
  );
};

Home.Layout = Layout;

export default Home;

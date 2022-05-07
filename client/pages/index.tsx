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
        <title className="underline">Home</title>
      </Head>

      <Container>
        <h1>{wallet} of App</h1>
        <Button onClick={connectWallet}>Connect Wallet</Button>
      </Container>
    </div>
  );
};

Home.Layout = Layout;

export default Home;

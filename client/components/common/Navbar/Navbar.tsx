import { Button } from "@components/ui";
import { useUI } from "@components/ui/context";
import s from "./Navbar.module.css";

const Navbar = () => {
  const { wallet, connectWallet, disconnectWallet } = useUI();

  return (
    <header className={s.root}>
      <nav className={s.nav}>
        <div className={s.logo}>
          <h1>KK</h1>
        </div>
        <div>
          {wallet ? (
            <Button className={s.btn} onClick={disconnectWallet}>
              {wallet}
            </Button>
          ) : (
            <Button className={s.btn} onClick={connectWallet}>
              Connect Wallet
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

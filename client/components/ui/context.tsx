import { createContext, FC, useContext, useState } from "react";

interface IUIProvider {
  children: React.ReactNode;
}

interface IContextProvider {
  wallet?: string;
  checkWallet: () => void;
  connectWallet: () => void;
}

export const UIContext = createContext<IContextProvider>({
  checkWallet: () => {},
  connectWallet: () => {},
});

export const UIProvider: FC<IUIProvider> = ({ children }) => {
  const [wallet, setWallet] = useState<string>();

  // Actions
  const checkWallet = async () => {
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
          setWallet(account);
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
  const connectWallet = async () => {
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
        setWallet(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    wallet,
    checkWallet,
    connectWallet,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  return context;
};

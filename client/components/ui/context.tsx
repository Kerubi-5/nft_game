import {
  createContext,
  FC,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import MarvelVerse from "@utils/MarvelVerse.json";
import { Contract, ethers } from "ethers";
import { transformCharacterData, CONTRACT_ADDRESS } from "@utils/normalize";

interface IUIProvider {
  children: ReactNode | ReactNode[];
}

interface IContextProvider {
  wallet?: string;
  characterNFT?: any;
  characters?: any[];
  gameContract?: Contract;
  setCharacterNFT?: any;
  checkWallet: () => void;
  connectWallet: () => void;
}

export const UIContext = createContext<IContextProvider>({
  checkWallet: () => {},
  connectWallet: () => {},
});

export const UIProvider: FC<IUIProvider> = ({ children }) => {
  const [wallet, setWallet] = useState<string>();
  const [characterNFT, setCharacterNFT] = useState(null);
  const [gameContract, setGameContract] = useState<Contract>();
  const [characters, setCharacters] = useState([]);

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

  const fetchGameContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum!);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, MarvelVerse.abi, signer);
  };

  const fetchAllDefaultCharacters = async () => {
    const gameContract = await fetchGameContract();
    const txn = await gameContract.getAllDefaultCharacters();
    const characters = txn.map((characterData: any) =>
      transformCharacterData(characterData)
    );
    setCharacters(characters);
  };

  const value = {
    wallet,
    characterNFT,
    characters,
    setCharacterNFT,
    gameContract,
    checkWallet,
    connectWallet,
  };

  // Fetch game contract
  useEffect(() => {
    const setContract = async () => {
      setGameContract(await fetchGameContract());
    };

    setContract();
  }, []);

  useEffect(() => {
    fetchAllDefaultCharacters();
  }, []);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  return context;
};

import {
  createContext,
  FC,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import MarvelVerse from "@utils/MarvelVerse.json";
import { BigNumber, Contract, ethers } from "ethers";
import { transformCharacterData, CONTRACT_ADDRESS } from "@utils/normalize";
import { Character } from "index";

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
  const [characterNFT, setCharacterNFT] = useState<Character>();
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

      if (ethereum.request) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

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
    const contract = await fetchGameContract();
    const txn = await contract.getAllDefaultCharacters();
    const characters = txn.map((characterData: any) =>
      transformCharacterData(characterData)
    );
    setCharacters(characters);
  };

  const fetchCharacterNFT = async () => {
    if (wallet && gameContract) {
      const contract = await fetchGameContract();
      const characterNFT = await contract.checkIfUserHasNFT();
      setCharacterNFT(transformCharacterData(characterNFT));
    }
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

  // Check if user has metamask
  useEffect(() => {
    checkWallet();
  }, []);

  // Fetch all default characters
  useEffect(() => {
    if (wallet) fetchAllDefaultCharacters();
  }, [wallet]);

  // Fetch character NFT
  useEffect(() => {
    if (wallet && gameContract) fetchCharacterNFT();
  }, [wallet, gameContract]);

  // Event listener
  useEffect(() => {
    const onCharacterMint = async (
      sender: string,
      tokenId: BigNumber,
      characterIndex: BigNumber
    ) => {
      console.log(
        `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
      );
      alert(
        `Your NFT is all done -- see it here: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
      );

      if (gameContract) {
        const characterNFT = await gameContract.checkIfUserHasNFT();
        console.log("CharacterNFT: ", characterNFT);
        setCharacterNFT(transformCharacterData(characterNFT));
      }
    };

    if (gameContract) {
      gameContract.on("CharacterNFTMinted", onCharacterMint);
    }

    return () => {
      if (gameContract) {
        gameContract.off("CharacterNFTMinted", onCharacterMint);
      }
    };
  }, []);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  return context;
};

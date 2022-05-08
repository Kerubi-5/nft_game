import { Button } from "@components/ui";
import { Character } from "index";
import s from "./CharacterCard.module.css";
import { useUI } from "@components/ui/context";
import { BigNumber } from "ethers";
// import { UilHeart, UilFire } from "@iconscout/react-unicons";

const CharacterCard = ({
  character,
  index,
}: {
  character: Character;
  index: BigNumber;
}) => {
  const { gameContract } = useUI();

  // mint character NFT
  const mintCharacter = async () => {
    if (gameContract) {
      try {
        console.log("Minting...");
        const mintTxn = await gameContract.mintCharacterNFT(index);

        await mintTxn.wait();

        console.log("Character minted");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={s.root}>
      <div className={s.body}>
        <span className={s.name}>{character.name}</span>
        <img className={s.img} src={character.imageURI} />
        <div className={s.overlay}>
          <div className={s.details}>
            <div className={s.detail}>⚔ {character.attackDamage}</div>
            <div>💙 {character.maxHp}</div>
          </div>
        </div>
      </div>

      <Button onClick={mintCharacter} className={s.btn}>
        Mint {character.name}
      </Button>
    </div>
  );
};

export default CharacterCard;

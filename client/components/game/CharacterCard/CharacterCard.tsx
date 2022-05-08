import { Button } from "@components/ui";
import { Character } from "index";
import s from "./CharacterCard.module.css";
import { useUI } from "@components/ui/context";
import { BigNumber } from "ethers";
// import { UilHeart, UilFire } from "@iconscout/react-unicons";

const CharacterCard = ({
  character,
  index,
  variant = "slim",
}: {
  character: Character;
  index?: BigNumber;
  variant?: "slim" | "arena";
}) => {
  const { gameContract } = useUI();
  const hpPercent = (character.hp / character.maxHp) * 100;

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
            <div>💙 {character.hp}</div>
          </div>
        </div>
      </div>

      {variant === "slim" ? (
        <Button onClick={mintCharacter} className={s.btn}>
          Mint {character.name}
        </Button>
      ) : (
        <div className="w-full bg-gray-200 dark:bg-gray-700">
          <div
            className={`bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none`}
            style={{
              width: `${hpPercent}%`,
            }}
          >
            {hpPercent}%
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;

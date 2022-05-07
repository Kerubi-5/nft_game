import { Button } from "@components/ui";
import { Character } from "index";
import s from "./CharacterCard.module.css";
// import { UilHeart, UilFire } from "@iconscout/react-unicons";

const CharacterCard = ({ character }: { character: Character }) => {
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

      <Button className={s.btn}>Mint {character.name}</Button>
    </div>
  );
};

export default CharacterCard;

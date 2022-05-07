import { Container } from "@components/ui";
import s from "./SelectCharacter.module.css";
import { useUI } from "@components/ui/context";
import CharacterCard from "../CharacterCard";

const SelectCharacter = () => {
  const { characters } = useUI();
  return (
    <div className={s.root}>
      <h1 className={s.title}>🦸‍♀️ Select your hero 🦸‍♂️</h1>
      <span>Choose wisely</span>
      <Container>
        <div className={s.cardContainer}>
          {characters &&
            characters.map((character) => {
              return (
                <CharacterCard key={character.name} character={character} />
              );
            })}
        </div>
      </Container>
    </div>
  );
};

export default SelectCharacter;

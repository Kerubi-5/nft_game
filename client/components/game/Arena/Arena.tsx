import { Button } from "@components/ui";
import { Character } from "index";
import { FC, useEffect, useState } from "react";
import CharacterCard from "../CharacterCard";
import { useUI } from "@components/ui/context";
import { transformCharacterData } from "@utils/normalize";

interface IArena {
  character: Character;
}

const Arena: FC<IArena> = ({ character }) => {
  const { gameContract } = useUI();
  const [boss, setBoss] = useState<Character>();

  const fetchBoss = async () => {
    if (gameContract) {
      try {
        const boss = await gameContract.getBigBoss();
        setBoss(transformCharacterData(boss));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchBoss();
  }, []);

  return (
    <div className="bg-red-600/75 space-y-5 py-5">
      <div className="grid grid-cols-3  md:p-5 items-center">
        <div>
          <h2>Your Hero 🦸‍♀️🦸‍♂️</h2>
          <CharacterCard character={character} variant="arena" />
        </div>

        <span className="text-8xl font-bold text-white place-content-center">
          ⚔
        </span>
        <div>
          <h2>The Boss 😈</h2>
          <CharacterCard character={boss!} variant="arena" />
        </div>
      </div>
      <div>
        <Button>Attack Now!</Button>
      </div>
    </div>
  );
};

export default Arena;

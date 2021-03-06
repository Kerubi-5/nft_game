import { Button } from "@components/ui";
import { Character } from "index";
import { FC, useEffect, useState } from "react";
import CharacterCard from "../CharacterCard";
import { useUI } from "@components/ui/context";
import { transformCharacterData } from "@utils/normalize";
import s from "./Arena.module.css";
import { BigNumber } from "ethers";

interface IArena {
  character: Character;
}

const Arena: FC<IArena> = ({ character }) => {
  const { gameContract, fetchCharacterNFT } = useUI();
  const [boss, setBoss] = useState<Character>();
  const [attack, setAttack] = useState(false);

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

  // Attack Event Listener
  useEffect(() => {
    const onAttack = async (
      sender: string,
      newBossHp: BigNumber,
      newPlayerHp: BigNumber
    ) => {
      fetchBoss();
      fetchCharacterNFT();
      alert(
        `Your HP is ${newPlayerHp.toNumber()}, and the boss's HP is ${newBossHp.toNumber()}`
      );
    };

    if (gameContract) {
      gameContract.on("AttackComplete", onAttack);
    }

    return () => {
      if (gameContract) {
        gameContract.off("AttackComplete", onAttack);
      }
    };
  }, []);

  const attackBoss = async () => {
    try {
      setAttack(true);

      if (gameContract) {
        const attackTxn = await gameContract.attackBoss();
        await attackTxn.wait();
      }

      setAttack(false);
    } catch (error) {
      console.log(error);
      setAttack(false);
    }
  };

  useEffect(() => {
    fetchBoss();
  }, []);

  return (
    <div className={s.root}>
      <div className={s.content}>
        <div>
          <h2 className={s.label}>Your Hero π¦ΈββοΈπ¦ΈββοΈ</h2>
          <CharacterCard character={character} variant="arena" />
        </div>
        <span className={`${s.vs} ${attack && "animate-bounce"}`}>β</span>
        <div>
          <h2 className={s.label}>The Boss π</h2>
          <div className={s.bossContainer}>
            {boss && <CharacterCard character={boss} variant="arena" />}
            {attack && <span className={s.hitAnimation}>π₯</span>}
          </div>
        </div>
      </div>
      <div>
        <Button onClick={attackBoss}>
          {attack ? "Attacking..." : "Attack Now!"}
        </Button>
      </div>
    </div>
  );
};

export default Arena;

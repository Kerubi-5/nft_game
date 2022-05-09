import { Character } from "index";

const CONTRACT_ADDRESS = "0x3d2888021dDc8059A1a3Ba058cb941EBf5a2276D";

/*
 * Add this method and make sure to export it on the bottom!
 */
const transformCharacterData = (characterData: any) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber(),
  };
};

export { CONTRACT_ADDRESS, transformCharacterData };

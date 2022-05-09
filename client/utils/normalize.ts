const CONTRACT_ADDRESS = "0x42aAc2921eebb5350caFa0932A3b1ef42f35582f";

/*
 * Add this method and make sure to export it on the bottom!
 */
const transformCharacterData = (characterData: any) => {
  return {
    name: characterData.name,
    imageURI: `https://gateway.pinata.cloud/ipfs/${characterData.imageURI}`,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber(),
  };
};

export { CONTRACT_ADDRESS, transformCharacterData };

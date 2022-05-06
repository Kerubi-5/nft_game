const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Dr. Strange", "Professor X", "Scarlet Witch"], // Names
    [
      "https://i.imgur.com/tfJqboJ.jpeg", // Dr. Strange
      "https://i.imgur.com/O2skXdz.jpeg", // Professor Xavier
      "https://i.imgur.com/sKoG1Co.jpeg", // Wanda
    ],
    [100, 200, 200], // HP values
    [100, 50, 100], // Attack damage values
    "Dormammu",
    "https://i.imgur.com/RdAGC2H.jpeg",
    1000,
    50
  );

  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(1);
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  console.log("Done deploying and minting!");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

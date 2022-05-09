const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Dr. Strange", "Professor X", "America Chavez"], // Names
    [
      "QmYcHv9Y4u6rL47XE5esAafPXwdCBg7ckfTXbeKr6KRMbG", // Dr. Strange
      "QmfHC8ZkZ6fr4wwe8hatW8ssSPybLVUcpzgVdkNGuLtLdU", // Professor Xavier
      "QmVm9Tv7NaqAuR5AdNvGm43c8BCh3HuNFsXu287zGM6ewh", // America Chavez
    ],
    [100, 250, 200], // HP values
    [200, 50, 100], // Attack damage values
    "Scarlet Witch",
    "QmcpaB6CvyQpyVvKKiHKyo2hGM7juaNxsR44vTdyvBFk6W",
    10000,
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

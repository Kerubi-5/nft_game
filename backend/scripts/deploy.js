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
    "QmUBZ6AxhCGP9nQbK5BiCowcJ2YdoaMnLnPhu7sBHx4Evx",
    10000,
    50
  );

  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

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

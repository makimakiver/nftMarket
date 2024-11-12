async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();

    console.log("NFT address:", nft.address);

    saveFrontendFiles(nft, "NFT");
}

main();
const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}
// testing environment (testing the smart contracts on the javascript)
describe('Escrow', () => {

    let buyer, seller, inspector , lender
    let realEstate, escrow

    beforeEach(async () => {
        // we only want to do minting from seller perspectives 
        // we will get acccounts from hardhats 

        // Set uo accounts
        [buyer, seller, inspector, lender] = await ethers.getSigners();


        // Deploy Estate
        const RealEstate = await ethers.getContractFactory('RealEstate')
        realEstate = await RealEstate.deploy();

        // Mint new NFT
        let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmQUozrHLAusXDxrvsESJ3PYB3rUeUuBAvVWw6nop2uu7c/1.png")
        await transaction.wait()
        // "image": "https://ipfs.io/ipfs/QmQUozrHLAusXDxrvsESJ3PYB3rUeUuBAvVWw6nop2uu7c/1.png",

        const Escrow = await ethers.getContractFactory('Escrow')
        escrow = await Escrow.deploy(
            realEstate.address,
            seller.address,
            inspector.address,
            lender.address
        )

        //Approve property
        transaction = await realEstate.connect(seller).approve(escrow.address, 1);
        await transaction.wait();
        //List property
        transaction = await escrow.connect(seller).list(1, buyer.address, tokens(10), tokens(5));
        await transaction.wait();
    })
})
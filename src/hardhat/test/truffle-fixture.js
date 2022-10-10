const { ethers, upgrades } = require("hardhat");
const path = require('path');
const envPath = path.join(__dirname, '../../.env');
require('dotenv').config({ path: envPath });
const hre = require("hardhat");
const BigNumber = require('bignumber.js');
const chalk = require('chalk');
const constants = require(path.join(__dirname, '../../../dist/types/constants'));

// FPI Core
const FPIS = artifacts.require("FPI/FPIS");

// Misc
const ERC20 = artifacts.require("contracts/ERC20/ERC20.sol:ERC20");

// veFPIS
const veFPIS = artifacts.require("Curve/veFPIS");

module.exports = async (deployer) => {
    const THE_ACCOUNTS = await hre.web3.eth.getAccounts();
    console.log("THE_ACCOUNTS[0] in truffle-fixture: ", THE_ACCOUNTS[0]);
	let CONTRACT_ADDRESSES;

    // Get the necessary instances
    // ======================================================

    // FPI Core
    let fpis_instance;

    // veFPIS
    let veFPIS_instance;

    // Assign live contract addresses
    // ======================================================
    CONTRACT_ADDRESSES = constants.CONTRACT_ADDRESSES;

 
    // FPI
    fpis_instance = await FPIS.at(CONTRACT_ADDRESSES.ethereum.canonicals.FPIS);

    console.log(chalk.yellow('========== veFPIS =========='));
    // veFPIS
    veFPIS_instance = await veFPIS.new(
        fpis_instance.address, 
        "veFPIS",
        "veFPIS",
        "veFPIS_1.0.0"
    );

    // Deploy contracts
    // ======================================================
    console.log(chalk.yellow('========== DEPLOY CONTRACTS =========='));
    FPIS.setAsDeployed(fpis_instance);
    veFPIS.setAsDeployed(veFPIS_instance);
}
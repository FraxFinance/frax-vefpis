# veFPIS
## Flowchart
![veFPIS Flowchart](veFPIS.svg)
## Overview Documentation
[https://docs.frax.finance/frax-price-index/vefpis](https://docs.frax.finance/frax-price-index/vefpis).


<!-- //////////////////////////////////////////////////////////////// -->
# Building and Testing
## Setup
1) ```git clone https://github.com/FraxFinance/frax-vefpis.git```
2) ```npm install```
3) Create your own .env and copy SAMPLE.env into there
4) ```cd ./src/hardhat && npx hardhat compile```

## Testing
### Hardhat
```cd ./src/hardhat && npx hardhat test ./test/veFPIS-Tests.js```


<!-- //////////////////////////////////////////////////////////////// -->
# Deployment & Environment Setup
## Deploy
1) Deploy FPIS.sol
2) Deploy veFPIS.vy

#### veFXS deploy script
npx hardhat run --network ethereum scripts/deploys/deploy_veFPIS.js

#### Etherscan Verification
Copy & paste the entire .vy file. Etherscan should support it

**---Flat File Compiling (Used as a backup for manual source code verification)---**
cd ./src/hardhat
```npx hardhat flatten ./contracts/<SUBFOLDER>/<FILENAME>.sol > ./flattened.sol```

sed -i '/SPDX-License-Identifier/d' ./flattened.sol
sed -i '/pragma solidity/d' ./flattened.sol
sed -i '1s/^/\/\/ SPDX-License-Identifier: GPL-2.0-or-later\npragma solidity >=0.8.0;\n\n/' flattened.sol
OPTIONAL [REMOVE "//" COMMENTS]: sed -i -E 's:(\s+(//|#)|^\s*(//|#)).*$::; /^$/d' flattened.sol
OPTIONAL [REMOVE "/*" COMMENTS]: sed -i -r ':a; s%(.*)/\*.*\*/%\1%; ta; /\/\*/ !b; N; ba' flattened.sol

<!-- //////////////////////////////////////////////////////////////// -->
# Contracts Under Review
## veFPIS.vy
Descendent of Curve's [veCRV](https://curve.readthedocs.io/dao-vecrv.html) with some changes. Users stake their FPIS for up to 4 years to get veFPIS, which is non-transferable. A user staking for the max 4 years will get 4 veVPIS, which will decay back down to 1 veFPIS after 4 years, at which point they can withdraw it. For later uses (not in this scope), veFPIS balances can be used for voting for FPIS gauges as well as protocol yield, much like what Curve does with veCRV and CRV. 

An feature has been added whereby a user can choose to have some of their locked FPIS "withdrawn" early to a trusted "proxy" contract. One idea is to use the FPIS as collateral to borrow other assets, paying a fee to the protocol for doing so. The proxy contract can liquidate and/or slash the user's FPIS position however under certain circumstances. The proxy contract is not in the scope of this audit, but it is important to mention it here so wardens understand the reasoning behind the ```proxy_pbk_liq_slsh``` function and associated proxy logic.

The test script has multiple scenarios, some with a user who never lends out their FPIS, some who do but pay it back, and some where they do and they get liquidated. Care needs to be taken to make sure that, after all is said and done, a user cannot pull extra FPIS, or a liquidation doesn't pull out other people's FPIS so that when they later try to withdraw, there is nothing there.

<!-- //////////////////////////////////////////////////////////////// -->
# Contracts Included but not under review
## FPIS.sol
The underlying token being staked. Behaves as a normal ERC20.

<!-- //////////////////////////////////////////////////////////////// -->
# Contest Scope
- veFPIS Repository: [https://github.com/FraxFinance/frax-vefpis.git](https://github.com/FraxFinance/frax-vefpis.git)
- 1 Non-library contracts in the scope
- 546 Total sLoC in scope.
- No novel or unique curve logic or mathematical models
- Not an NFT
- Not an AMM
- Not a fork of a popular project
- Does not use rollups
- Single-chain only
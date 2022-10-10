**---Deploying---**
cd ./src/hardhat

ETHEREUM
npx hardhat run --network ethereum scripts/deploys/deploy_FPI_and_FPIS.js


**---Verifying---**


**---Flat File Compiling (Used as a backup for manual source code verification)---**
cd ./src/hardhat
<!-- npx hardhat flatten ./contracts/FPI/FPIS.sol > ./flattened.sol -->

sed -i '/SPDX-License-Identifier/d' ./flattened.sol
sed -i '/pragma solidity/d' ./flattened.sol
sed -i '1s/^/\/\/ SPDX-License-Identifier: GPL-2.0-or-later\npragma solidity >=0.8.0;\n\n/' flattened.sol
OPTIONAL [REMOVE "//" COMMENTS]: sed -i -E 's:(\s+(//|#)|^\s*(//|#)).*$::; /^$/d' flattened.sol
OPTIONAL [REMOVE "/*" COMMENTS]: sed -i -r ':a; s%(.*)/\*.*\*/%\1%; ta; /\/\*/ !b; N; ba' flattened.sol
OPTIONAL [REMOVE NEWLINES]: sed -i ':a;$!{N;s/\n/ /;ba;}' flattened.sol
OPTIONAL [REMOVE WHITESPACE]: sed -i -r 's/\s+//g' flattened.sol

BACKUP VERIFICATION #1 (NPX HARDHAT VERIFY THE flattened.sol)
1) Make sure the etherscan option in hardhat config is on the right chain
2a) npx hardhat verify --network optimism --contract contracts/flattened2.sol:ComboOracle 0xE7d6CB15aBE01c681b81f46e6c289aD492c04f5c
2b) npx hardhat verify --network optimism --contract contracts/flattened2.sol:ComboOracle --constructor-args ./scripts/deploys/arguments/frax_middleman_gauge_arguments.js 0xE7d6CB15aBE01c681b81f46e6c289aD492c04f5c

BACKUP VERIFICATION #2 (SOURCIFY)
1) Paste the flattened.sol file in the saddle-contract file
2) Edit Boba 007_deploy_MiscTest
3) do a 'deploy'
4) npx hardhat --network boba sourcify


# Truffle Size Estimator
truffle run contract-size


**---Deploying---**
cd ./src/hardhat

ETHEREUM
```npx hardhat run --network ethereum scripts/deploys/deploy_FPI_and_FPIS.js```


**---Verifying---**


**---Flat File Compiling (Used as a backup for manual source code verification)---**
cd ./src/hardhat
```npx hardhat flatten ./contracts/FPI/FPIS.sol > ./flattened.sol```

sed -i '/SPDX-License-Identifier/d' ./flattened.sol
sed -i '/pragma solidity/d' ./flattened.sol
sed -i '1s/^/\/\/ SPDX-License-Identifier: GPL-2.0-or-later\npragma solidity >=0.8.0;\n\n/' flattened.sol
OPTIONAL [REMOVE "//" COMMENTS]: sed -i -E 's:(\s+(//|#)|^\s*(//|#)).*$::; /^$/d' flattened.sol
OPTIONAL [REMOVE "/*" COMMENTS]: sed -i -r ':a; s%(.*)/\*.*\*/%\1%; ta; /\/\*/ !b; N; ba' flattened.sol

# Truffle Size Estimator
truffle run contract-size


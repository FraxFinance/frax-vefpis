const BigNumber = require("bignumber.js");

export const BIG6 = new BigNumber("1e6");
export const BIG8 = new BigNumber("1e8");
export const BIG12 = new BigNumber("1e12");
export const BIG18 = new BigNumber("1e18");
export const ONE_E18 = 10**18;


export function omit(key, obj) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}


export const CONTRACT_ADDRESSES = {
  ethereum: {
    chain_id: 1,
    main: {
      veFPIS: "0x1B0b9991Df27a4F2847478127d51Fb29883882f5",
    },
    canonicals: {
      FPIS: "0xc2544A32872A91F4A553b404C6950e89De901fdb",
    },
  },
}

export { }; // Force this file to be a module
import { CONTRACT_ADDRESSES, ONE_E18, BIG6, BIG18 }  from '../types/constants';
import { Pool, Position, FeeAmount, TickMath, encodeSqrtRatioX96, tickToPrice } from '@uniswap/v3-sdk';
import { Token, Price } from '@uniswap/sdk-core';
const BigNumber = require('bignumber.js');
const axios = require('axios').default;
const chalk = require('chalk');

export const printVeFPIS_Points = async (vefpis_instance: any, epoch: any, addr: any) => {
    // Global Point
    const point = await vefpis_instance.point_history(epoch);
    const converted_point = {
        bias: new BigNumber(point.bias).toNumber(),
        slope: new BigNumber(point.slope).toNumber(),
        ts: new BigNumber(point.ts).toNumber(),
        blk: new BigNumber(point.blk).toNumber(),
        fpis_amt: (new BigNumber(point.fpis_amt)).div(BIG18).toNumber(),
    }
    console.log("Point: ", converted_point);

    // User Point
    const user_point = await vefpis_instance.user_point_history(addr, epoch);
    const converted_user_point = {
        bias: new BigNumber(user_point.bias).toNumber(),
        slope: new BigNumber(user_point.slope).toNumber(),
        ts: new BigNumber(user_point.ts).toNumber(),
        blk: new BigNumber(user_point.blk).toNumber(),
        fpis_amt: (new BigNumber(user_point.fpis_amt)).div(BIG18).toNumber(),
    }
    console.log(`User Point ${addr}: `, converted_user_point);
}

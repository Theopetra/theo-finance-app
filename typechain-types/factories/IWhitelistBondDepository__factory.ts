/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IWhitelistBondDepository,
  IWhitelistBondDepositoryInterface,
} from "../IWhitelistBondDepository";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_bid",
        type: "uint256",
      },
    ],
    name: "calculatePrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "close",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_quoteToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_priceFeed",
        type: "address",
      },
      {
        internalType: "uint256[2]",
        name: "_market",
        type: "uint256[2]",
      },
      {
        internalType: "bool[2]",
        name: "_booleans",
        type: "bool[2]",
      },
      {
        internalType: "uint256[2]",
        name: "_terms",
        type: "uint256[2]",
      },
    ],
    name: "create",
    outputs: [
      {
        internalType: "uint256",
        name: "id_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_bid",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxPrice",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "address",
        name: "_referral",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "deposit",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "payout_",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expiry_",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "index_",
            type: "uint256",
          },
        ],
        internalType: "struct IWhitelistBondDepository.DepositInfo",
        name: "depositInfo",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_bid",
        type: "uint256",
      },
    ],
    name: "isLive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "liveMarkets",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_quoteToken",
        type: "address",
      },
    ],
    name: "liveMarketsFor",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_bid",
        type: "uint256",
      },
    ],
    name: "payoutFor",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IWhitelistBondDepository__factory {
  static readonly abi = _abi;
  static createInterface(): IWhitelistBondDepositoryInterface {
    return new utils.Interface(_abi) as IWhitelistBondDepositoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IWhitelistBondDepository {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IWhitelistBondDepository;
  }
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  TheopetraAccessControlled,
  TheopetraAccessControlledInterface,
} from "../TheopetraAccessControlled";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ITheopetraAuthority",
        name: "authority",
        type: "address",
      },
    ],
    name: "AuthorityUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "authority",
    outputs: [
      {
        internalType: "contract ITheopetraAuthority",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ITheopetraAuthority",
        name: "_newAuthority",
        type: "address",
      },
    ],
    name: "setAuthority",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class TheopetraAccessControlled__factory {
  static readonly abi = _abi;
  static createInterface(): TheopetraAccessControlledInterface {
    return new utils.Interface(_abi) as TheopetraAccessControlledInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TheopetraAccessControlled {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TheopetraAccessControlled;
  }
}

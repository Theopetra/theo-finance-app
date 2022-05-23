/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TwapGetter, TwapGetterInterface } from "../TwapGetter";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_theo",
        type: "address",
      },
      {
        internalType: "address",
        name: "_performanceToken",
        type: "address",
      },
      {
        internalType: "uint24",
        name: "_fee",
        type: "uint24",
      },
      {
        internalType: "uint32",
        name: "_secondsAgo",
        type: "uint32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fee",
    outputs: [
      {
        internalType: "uint24",
        name: "",
        type: "uint24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "performanceToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "secondsAgo",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "theo",
    outputs: [
      {
        internalType: "address",
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
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "valuation",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x61012060405234801561001157600080fd5b50604051610ea1380380610ea1833981810160405260a081101561003457600080fd5b508051602082015160408301516060808501516080958601516001600160601b031986841b811690975284831b871660a0529183901b90951660c0526001600160e81b031960e886901b16610100529293919290919063ffffffff81166100e2576040805162461bcd60e51b815260206004820152601760248201527f4e6f2074696d6520706572696f642070726f7669646564000000000000000000604482015290519081900360640190fd5b6001600160e01b031960e091821b1690525050505060805160601c60a05160601c60c05160601c60e05160e01c6101005160e81c610d3461016d6000398061020952806106c952508061032c52806105d4528061061752806106815250806101b252806106ed52508061012c5280610153528061018c5250806101d852806106a55250610d346000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c8063c45a015511610050578063c45a0155146100fa578063ddca3f4314610102578063ec7443251461012257610072565b806302414d2c146100775780634249719f1461009b578063633dd145146100d9575b600080fd5b61007f61012a565b604080516001600160a01b039092168252519081900360200190f35b6100c7600480360360408110156100b157600080fd5b506001600160a01b03813516906020013561014e565b60408051918252519081900360200190f35b6100e161067f565b6040805163ffffffff9092168252519081900360200190f35b61007f6106a3565b61010a6106c7565b6040805162ffffff9092168252519081900360200190f35b61007f6106eb565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316846001600160a01b0316146101b0577f00000000000000000000000000000000000000000000000000000000000000006101d2565b7f00000000000000000000000000000000000000000000000000000000000000005b905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316631698ee8286847f00000000000000000000000000000000000000000000000000000000000000006040518463ffffffff1660e01b815260040180846001600160a01b03168152602001836001600160a01b031681526020018262ffffff168152602001935050505060206040518083038186803b15801561028157600080fd5b505afa158015610295573d6000803e3d6000fd5b505050506040513d60208110156102ab57600080fd5b505190506001600160a01b03811661030a576040805162461bcd60e51b815260206004820152601360248201527f506f6f6c20646f6573206e6f7420657869737400000000000000000000000000604482015290519081900360640190fd5b60408051600280825260608083018452926020830190803683370190505090507f00000000000000000000000000000000000000000000000000000000000000008160008151811061035857fe5b602002602001019063ffffffff16908163ffffffff168152505060008160018151811061038157fe5b63ffffffff9092166020928302919091018201526040517f883bdbfd000000000000000000000000000000000000000000000000000000008152600481018281528351602483015283516060936001600160a01b0387169363883bdbfd9387939092839260440191858201910280838360005b8381101561040c5781810151838201526020016103f4565b505050509050019250505060006040518083038186803b15801561042f57600080fd5b505afa158015610443573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604090815281101561048a57600080fd5b81019080805160405193929190846401000000008211156104aa57600080fd5b9083019060208201858111156104bf57600080fd5b82518660208202830111640100000000821117156104dc57600080fd5b82525081516020918201928201910280838360005b838110156105095781810151838201526020016104f1565b505050509050016040526020018051604051939291908464010000000082111561053257600080fd5b90830190602082018581111561054757600080fd5b825186602082028301116401000000008211171561056457600080fd5b82525081516020918201928201910280838360005b83811015610591578181015183820152602001610579565b505050509050016040525050505090506000816000815181106105b057fe5b6020026020010151826001815181106105c557fe5b602002602001015103905060007f000000000000000000000000000000000000000000000000000000000000000063ffffffff168260060b8161060457fe5b05905060008260060b12801561064e57507f000000000000000000000000000000000000000000000000000000000000000063ffffffff168260060b8161064757fe5b0760060b15155b1561065857600019015b60006106638961070f565b905061067182828c8a610764565b9a9950505050505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b600070010000000000000000000000000000000082106107605760405162461bcd60e51b8152600401808060200182810382526027815260200180610cd86027913960400191505060405180910390fd5b5090565b600080610770866108cc565b90506fffffffffffffffffffffffffffffffff6001600160a01b03821611610824576001600160a01b03808216800290848116908616106107e6576107e17801000000000000000000000000000000000000000000000000876fffffffffffffffffffffffffffffffff1683610c27565b61081c565b61081c81876fffffffffffffffffffffffffffffffff167801000000000000000000000000000000000000000000000000610c27565b9250506108c3565b60006108436001600160a01b0383168068010000000000000000610c27565b9050836001600160a01b0316856001600160a01b0316106108915761088c700100000000000000000000000000000000876fffffffffffffffffffffffffffffffff1683610c27565b6108bf565b6108bf81876fffffffffffffffffffffffffffffffff16700100000000000000000000000000000000610c27565b9250505b50949350505050565b60008060008360020b126108e3578260020b6108eb565b8260020b6000035b9050620d89e8811115610945576040805162461bcd60e51b815260206004820152600160248201527f5400000000000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b60006001821661096657700100000000000000000000000000000000610978565b6ffffcb933bd6fad37aa2d162d1a5940015b70ffffffffffffffffffffffffffffffffff16905060028216156109ac576ffff97272373d413259a46990580e213a0260801c5b60048216156109cb576ffff2e50f5f656932ef12357cf3c7fdcc0260801c5b60088216156109ea576fffe5caca7e10e4e61c3624eaa0941cd00260801c5b6010821615610a09576fffcb9843d60f6159c9db58835c9266440260801c5b6020821615610a28576fff973b41fa98c081472e6896dfb254c00260801c5b6040821615610a47576fff2ea16466c96a3843ec78b326b528610260801c5b6080821615610a66576ffe5dee046a99a2a811c461f1969c30530260801c5b610100821615610a86576ffcbe86c7900a88aedcffc83b479aa3a40260801c5b610200821615610aa6576ff987a7253ac413176f2b074cf7815e540260801c5b610400821615610ac6576ff3392b0822b70005940c7a398e4b70f30260801c5b610800821615610ae6576fe7159475a2c29b7443b29c7fa6e889d90260801c5b611000821615610b06576fd097f3bdfd2022b8845ad8f792aa58250260801c5b612000821615610b26576fa9f746462d870fdf8a65dc1f90e061e50260801c5b614000821615610b46576f70d869a156d2a1b890bb3df62baf32f70260801c5b618000821615610b66576f31be135f97d08fd981231505542fcfa60260801c5b62010000821615610b87576f09aa508b5b7a84e1c677de54f3e99bc90260801c5b62020000821615610ba7576e5d6af8dedb81196699c329225ee6040260801c5b62040000821615610bc6576d2216e584f5fa1ea926041bedfe980260801c5b62080000821615610be3576b048a170391f7dc42444e8fa20260801c5b60008460020b1315610bfe578060001981610bfa57fe5b0490505b640100000000810615610c12576001610c15565b60005b60ff16602082901c0192505050919050565b6000808060001985870986860292508281109083900303905080610c5d5760008411610c5257600080fd5b508290049050610cd0565b808411610c6957600080fd5b6000848688096000868103871696879004966002600389028118808a02820302808a02820302808a02820302808a02820302808a02820302808a02909103029181900381900460010186841190950394909402919094039290920491909117919091029150505b939250505056fe53616665436173743a2076616c756520646f65736e27742066697420696e203132382062697473a26469706673582212204c4e8c1ed5a832620f8b126dcf36fd1fff87336c72639aa8ff3f4491b5d3183564736f6c63430007050033";

export class TwapGetter__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _factory: string,
    _theo: string,
    _performanceToken: string,
    _fee: BigNumberish,
    _secondsAgo: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TwapGetter> {
    return super.deploy(
      _factory,
      _theo,
      _performanceToken,
      _fee,
      _secondsAgo,
      overrides || {}
    ) as Promise<TwapGetter>;
  }
  getDeployTransaction(
    _factory: string,
    _theo: string,
    _performanceToken: string,
    _fee: BigNumberish,
    _secondsAgo: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _factory,
      _theo,
      _performanceToken,
      _fee,
      _secondsAgo,
      overrides || {}
    );
  }
  attach(address: string): TwapGetter {
    return super.attach(address) as TwapGetter;
  }
  connect(signer: Signer): TwapGetter__factory {
    return super.connect(signer) as TwapGetter__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TwapGetterInterface {
    return new utils.Interface(_abi) as TwapGetterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TwapGetter {
    return new Contract(address, _abi, signerOrProvider) as TwapGetter;
  }
}
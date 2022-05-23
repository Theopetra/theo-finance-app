/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface TheopetraStakingInterface extends ethers.utils.Interface {
  functions: {
    "THEO()": FunctionFragment;
    "authority()": FunctionFragment;
    "basis()": FunctionFragment;
    "claim(address,uint256[])": FunctionFragment;
    "claimAll(address)": FunctionFragment;
    "contractBalance()": FunctionFragment;
    "definePenalties(uint256[],uint256[])": FunctionFragment;
    "distributor()": FunctionFragment;
    "epoch()": FunctionFragment;
    "forfeit(uint256)": FunctionFragment;
    "getClaimsCount(address)": FunctionFragment;
    "getPenalty(uint256,uint256)": FunctionFragment;
    "giveLockBonus(uint256)": FunctionFragment;
    "index()": FunctionFragment;
    "indexesFor(address,bool)": FunctionFragment;
    "isUnRedeemed(address,uint256)": FunctionFragment;
    "isUnRetrieved(address,uint256)": FunctionFragment;
    "locker()": FunctionFragment;
    "pullClaim(address,uint256)": FunctionFragment;
    "pushClaim(address,uint256)": FunctionFragment;
    "pushClaimForBond(address,uint256)": FunctionFragment;
    "rebase()": FunctionFragment;
    "returnLockBonus(uint256)": FunctionFragment;
    "rewardsFor(address,uint256)": FunctionFragment;
    "sTHEO()": FunctionFragment;
    "setAuthority(address)": FunctionFragment;
    "setBondDepo(address,bool)": FunctionFragment;
    "setContract(uint8,address)": FunctionFragment;
    "setWarmup(uint256)": FunctionFragment;
    "stake(address,uint256,bool)": FunctionFragment;
    "stakingInfo(address,uint256)": FunctionFragment;
    "stakingTerm()": FunctionFragment;
    "supplyInWarmup()": FunctionFragment;
    "toggleLock()": FunctionFragment;
    "totalBonus()": FunctionFragment;
    "treasury()": FunctionFragment;
    "unstake(address,uint256[],bool,uint256[])": FunctionFragment;
    "warmupContract()": FunctionFragment;
    "warmupPeriod()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "THEO", values?: undefined): string;
  encodeFunctionData(functionFragment: "authority", values?: undefined): string;
  encodeFunctionData(functionFragment: "basis", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "claim",
    values: [string, BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: "claimAll", values: [string]): string;
  encodeFunctionData(
    functionFragment: "contractBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "definePenalties",
    values: [BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "distributor",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "epoch", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "forfeit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getClaimsCount",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getPenalty",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "giveLockBonus",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "index", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "indexesFor",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "isUnRedeemed",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isUnRetrieved",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "locker", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pullClaim",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "pushClaim",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "pushClaimForBond",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "rebase", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "returnLockBonus",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "rewardsFor",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "sTHEO", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setAuthority",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setBondDepo",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setContract",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setWarmup",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stake",
    values: [string, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "stakingInfo",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stakingTerm",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supplyInWarmup",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "toggleLock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalBonus",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "treasury", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "unstake",
    values: [string, BigNumberish[], boolean, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "warmupContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "warmupPeriod",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "THEO", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "authority", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "basis", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claimAll", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "contractBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "definePenalties",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "distributor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "epoch", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "forfeit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getClaimsCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPenalty", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "giveLockBonus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "index", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "indexesFor", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isUnRedeemed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isUnRetrieved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "locker", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pullClaim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pushClaim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pushClaimForBond",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rebase", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "returnLockBonus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rewardsFor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sTHEO", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAuthority",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setBondDepo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setWarmup", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stakingInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakingTerm",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supplyInWarmup",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "toggleLock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalBonus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "treasury", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unstake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "warmupContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "warmupPeriod",
    data: BytesLike
  ): Result;

  events: {
    "AuthorityUpdated(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AuthorityUpdated"): EventFragment;
}

export type AuthorityUpdatedEvent = TypedEvent<
  [string] & { authority: string }
>;

export class TheopetraStaking extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: TheopetraStakingInterface;

  functions: {
    THEO(overrides?: CallOverrides): Promise<[string]>;

    authority(overrides?: CallOverrides): Promise<[string]>;

    basis(overrides?: CallOverrides): Promise<[string]>;

    claim(
      _recipient: string,
      _indexes: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimAll(
      _recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    contractBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    definePenalties(
      bands: BigNumberish[],
      penalties: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    distributor(overrides?: CallOverrides): Promise<[string]>;

    epoch(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        length: BigNumber;
        number: BigNumber;
        end: BigNumber;
        distribute: BigNumber;
      }
    >;

    forfeit(
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getClaimsCount(
      _user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getPenalty(
      _amount: BigNumberish,
      stakingTimePercentComplete: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    giveLockBonus(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    index(overrides?: CallOverrides): Promise<[BigNumber]>;

    indexesFor(
      _user: string,
      unRetrieved: boolean,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    isUnRedeemed(
      _user: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isUnRetrieved(
      _user: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    locker(overrides?: CallOverrides): Promise<[string]>;

    pullClaim(
      _from: string,
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pushClaim(
      _to: string,
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pushClaimForBond(
      _to: string,
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rebase(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    returnLockBonus(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rewardsFor(
      _user: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { currentRewards_: BigNumber }>;

    sTHEO(overrides?: CallOverrides): Promise<[string]>;

    setAuthority(
      _newAuthority: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBondDepo(
      _bondDepo: string,
      val: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setContract(
      _contract: BigNumberish,
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setWarmup(
      _warmupPeriod: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stake(
      _recipient: string,
      _amount: BigNumberish,
      _claim: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stakingInfo(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        deposit: BigNumber;
        gonsInWarmup: BigNumber;
        warmupExpiry: BigNumber;
        stakingExpiry: BigNumber;
        gonsRemaining: BigNumber;
      }
    >;

    stakingTerm(overrides?: CallOverrides): Promise<[BigNumber]>;

    supplyInWarmup(overrides?: CallOverrides): Promise<[BigNumber]>;

    toggleLock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalBonus(overrides?: CallOverrides): Promise<[BigNumber]>;

    treasury(overrides?: CallOverrides): Promise<[string]>;

    unstake(
      _to: string,
      _amounts: BigNumberish[],
      _trigger: boolean,
      _indexes: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    warmupContract(overrides?: CallOverrides): Promise<[string]>;

    warmupPeriod(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  THEO(overrides?: CallOverrides): Promise<string>;

  authority(overrides?: CallOverrides): Promise<string>;

  basis(overrides?: CallOverrides): Promise<string>;

  claim(
    _recipient: string,
    _indexes: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimAll(
    _recipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  contractBalance(overrides?: CallOverrides): Promise<BigNumber>;

  definePenalties(
    bands: BigNumberish[],
    penalties: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  distributor(overrides?: CallOverrides): Promise<string>;

  epoch(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      length: BigNumber;
      number: BigNumber;
      end: BigNumber;
      distribute: BigNumber;
    }
  >;

  forfeit(
    _index: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getClaimsCount(_user: string, overrides?: CallOverrides): Promise<BigNumber>;

  getPenalty(
    _amount: BigNumberish,
    stakingTimePercentComplete: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  giveLockBonus(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  index(overrides?: CallOverrides): Promise<BigNumber>;

  indexesFor(
    _user: string,
    unRetrieved: boolean,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  isUnRedeemed(
    _user: string,
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isUnRetrieved(
    _user: string,
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  locker(overrides?: CallOverrides): Promise<string>;

  pullClaim(
    _from: string,
    _index: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pushClaim(
    _to: string,
    _index: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pushClaimForBond(
    _to: string,
    _index: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rebase(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  returnLockBonus(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rewardsFor(
    _user: string,
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  sTHEO(overrides?: CallOverrides): Promise<string>;

  setAuthority(
    _newAuthority: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBondDepo(
    _bondDepo: string,
    val: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setContract(
    _contract: BigNumberish,
    _address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setWarmup(
    _warmupPeriod: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stake(
    _recipient: string,
    _amount: BigNumberish,
    _claim: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stakingInfo(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      deposit: BigNumber;
      gonsInWarmup: BigNumber;
      warmupExpiry: BigNumber;
      stakingExpiry: BigNumber;
      gonsRemaining: BigNumber;
    }
  >;

  stakingTerm(overrides?: CallOverrides): Promise<BigNumber>;

  supplyInWarmup(overrides?: CallOverrides): Promise<BigNumber>;

  toggleLock(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalBonus(overrides?: CallOverrides): Promise<BigNumber>;

  treasury(overrides?: CallOverrides): Promise<string>;

  unstake(
    _to: string,
    _amounts: BigNumberish[],
    _trigger: boolean,
    _indexes: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  warmupContract(overrides?: CallOverrides): Promise<string>;

  warmupPeriod(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    THEO(overrides?: CallOverrides): Promise<string>;

    authority(overrides?: CallOverrides): Promise<string>;

    basis(overrides?: CallOverrides): Promise<string>;

    claim(
      _recipient: string,
      _indexes: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimAll(_recipient: string, overrides?: CallOverrides): Promise<BigNumber>;

    contractBalance(overrides?: CallOverrides): Promise<BigNumber>;

    definePenalties(
      bands: BigNumberish[],
      penalties: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    distributor(overrides?: CallOverrides): Promise<string>;

    epoch(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        length: BigNumber;
        number: BigNumber;
        end: BigNumber;
        distribute: BigNumber;
      }
    >;

    forfeit(_index: BigNumberish, overrides?: CallOverrides): Promise<void>;

    getClaimsCount(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPenalty(
      _amount: BigNumberish,
      stakingTimePercentComplete: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    giveLockBonus(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    index(overrides?: CallOverrides): Promise<BigNumber>;

    indexesFor(
      _user: string,
      unRetrieved: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    isUnRedeemed(
      _user: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isUnRetrieved(
      _user: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    locker(overrides?: CallOverrides): Promise<string>;

    pullClaim(
      _from: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pushClaim(
      _to: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    pushClaimForBond(
      _to: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rebase(overrides?: CallOverrides): Promise<BigNumber>;

    returnLockBonus(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    rewardsFor(
      _user: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sTHEO(overrides?: CallOverrides): Promise<string>;

    setAuthority(
      _newAuthority: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setBondDepo(
      _bondDepo: string,
      val: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setContract(
      _contract: BigNumberish,
      _address: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setWarmup(
      _warmupPeriod: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    stake(
      _recipient: string,
      _amount: BigNumberish,
      _claim: boolean,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { _index: BigNumber }>;

    stakingInfo(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        deposit: BigNumber;
        gonsInWarmup: BigNumber;
        warmupExpiry: BigNumber;
        stakingExpiry: BigNumber;
        gonsRemaining: BigNumber;
      }
    >;

    stakingTerm(overrides?: CallOverrides): Promise<BigNumber>;

    supplyInWarmup(overrides?: CallOverrides): Promise<BigNumber>;

    toggleLock(overrides?: CallOverrides): Promise<void>;

    totalBonus(overrides?: CallOverrides): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<string>;

    unstake(
      _to: string,
      _amounts: BigNumberish[],
      _trigger: boolean,
      _indexes: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    warmupContract(overrides?: CallOverrides): Promise<string>;

    warmupPeriod(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "AuthorityUpdated(address)"(
      authority?: string | null
    ): TypedEventFilter<[string], { authority: string }>;

    AuthorityUpdated(
      authority?: string | null
    ): TypedEventFilter<[string], { authority: string }>;
  };

  estimateGas: {
    THEO(overrides?: CallOverrides): Promise<BigNumber>;

    authority(overrides?: CallOverrides): Promise<BigNumber>;

    basis(overrides?: CallOverrides): Promise<BigNumber>;

    claim(
      _recipient: string,
      _indexes: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimAll(
      _recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    contractBalance(overrides?: CallOverrides): Promise<BigNumber>;

    definePenalties(
      bands: BigNumberish[],
      penalties: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    distributor(overrides?: CallOverrides): Promise<BigNumber>;

    epoch(overrides?: CallOverrides): Promise<BigNumber>;

    forfeit(
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getClaimsCount(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPenalty(
      _amount: BigNumberish,
      stakingTimePercentComplete: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    giveLockBonus(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    index(overrides?: CallOverrides): Promise<BigNumber>;

    indexesFor(
      _user: string,
      unRetrieved: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isUnRedeemed(
      _user: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isUnRetrieved(
      _user: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    locker(overrides?: CallOverrides): Promise<BigNumber>;

    pullClaim(
      _from: string,
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pushClaim(
      _to: string,
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pushClaimForBond(
      _to: string,
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rebase(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    returnLockBonus(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rewardsFor(
      _user: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sTHEO(overrides?: CallOverrides): Promise<BigNumber>;

    setAuthority(
      _newAuthority: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBondDepo(
      _bondDepo: string,
      val: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setContract(
      _contract: BigNumberish,
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setWarmup(
      _warmupPeriod: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stake(
      _recipient: string,
      _amount: BigNumberish,
      _claim: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stakingInfo(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    stakingTerm(overrides?: CallOverrides): Promise<BigNumber>;

    supplyInWarmup(overrides?: CallOverrides): Promise<BigNumber>;

    toggleLock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalBonus(overrides?: CallOverrides): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<BigNumber>;

    unstake(
      _to: string,
      _amounts: BigNumberish[],
      _trigger: boolean,
      _indexes: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    warmupContract(overrides?: CallOverrides): Promise<BigNumber>;

    warmupPeriod(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    THEO(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    authority(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    basis(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    claim(
      _recipient: string,
      _indexes: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimAll(
      _recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    contractBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    definePenalties(
      bands: BigNumberish[],
      penalties: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    distributor(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    epoch(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    forfeit(
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getClaimsCount(
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPenalty(
      _amount: BigNumberish,
      stakingTimePercentComplete: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    giveLockBonus(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    index(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    indexesFor(
      _user: string,
      unRetrieved: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isUnRedeemed(
      _user: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isUnRetrieved(
      _user: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    locker(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pullClaim(
      _from: string,
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pushClaim(
      _to: string,
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pushClaimForBond(
      _to: string,
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rebase(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    returnLockBonus(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rewardsFor(
      _user: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sTHEO(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setAuthority(
      _newAuthority: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBondDepo(
      _bondDepo: string,
      val: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setContract(
      _contract: BigNumberish,
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setWarmup(
      _warmupPeriod: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stake(
      _recipient: string,
      _amount: BigNumberish,
      _claim: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stakingInfo(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    stakingTerm(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    supplyInWarmup(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    toggleLock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalBonus(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    treasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    unstake(
      _to: string,
      _amounts: BigNumberish[],
      _trigger: boolean,
      _indexes: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    warmupContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    warmupPeriod(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
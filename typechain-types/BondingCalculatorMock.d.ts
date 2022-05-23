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

interface BondingCalculatorMockInterface extends ethers.utils.Interface {
  functions: {
    "mockPrice()": FunctionFragment;
    "quoteToken()": FunctionFragment;
    "setValuation(uint160)": FunctionFragment;
    "theo()": FunctionFragment;
    "valuation(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "mockPrice", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "quoteToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setValuation",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "theo", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "valuation",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "mockPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "quoteToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setValuation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "theo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "valuation", data: BytesLike): Result;

  events: {};
}

export class BondingCalculatorMock extends BaseContract {
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

  interface: BondingCalculatorMockInterface;

  functions: {
    mockPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    quoteToken(overrides?: CallOverrides): Promise<[string]>;

    setValuation(
      _mockPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    theo(overrides?: CallOverrides): Promise<[string]>;

    valuation(
      tokenIn: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountOut: BigNumber }>;
  };

  mockPrice(overrides?: CallOverrides): Promise<BigNumber>;

  quoteToken(overrides?: CallOverrides): Promise<string>;

  setValuation(
    _mockPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  theo(overrides?: CallOverrides): Promise<string>;

  valuation(
    tokenIn: string,
    _amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    mockPrice(overrides?: CallOverrides): Promise<BigNumber>;

    quoteToken(overrides?: CallOverrides): Promise<string>;

    setValuation(
      _mockPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    theo(overrides?: CallOverrides): Promise<string>;

    valuation(
      tokenIn: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    mockPrice(overrides?: CallOverrides): Promise<BigNumber>;

    quoteToken(overrides?: CallOverrides): Promise<BigNumber>;

    setValuation(
      _mockPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    theo(overrides?: CallOverrides): Promise<BigNumber>;

    valuation(
      tokenIn: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    mockPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    quoteToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setValuation(
      _mockPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    theo(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    valuation(
      tokenIn: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
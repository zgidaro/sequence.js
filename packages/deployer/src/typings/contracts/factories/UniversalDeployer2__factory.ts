/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  UniversalDeployer2,
  UniversalDeployer2Interface,
} from "../UniversalDeployer2";

const _abi = [
  {
    anonymous: true,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "Deploy",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_creationCode",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_instance",
        type: "uint256",
      },
    ],
    name: "deploy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061013d806100206000396000f3fe60806040526004361061001e5760003560e01c80639c4ae2d014610023575b600080fd5b6100cb6004803603604081101561003957600080fd5b81019060208101813564010000000081111561005457600080fd5b82018360208201111561006657600080fd5b8035906020019184600183028401116401000000008311171561008857600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955050913592506100cd915050565b005b60008183516020850134f56040805173ffffffffffffffffffffffffffffffffffffffff83168152905191925081900360200190a050505056fea264697066735822122033609f614f03931b92d88c309d698449bb77efcd517328d341fa4f923c5d8c7964736f6c63430007060033";

type UniversalDeployer2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UniversalDeployer2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UniversalDeployer2__factory extends ContractFactory {
  constructor(...args: UniversalDeployer2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      UniversalDeployer2 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): UniversalDeployer2__factory {
    return super.connect(runner) as UniversalDeployer2__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UniversalDeployer2Interface {
    return new Interface(_abi) as UniversalDeployer2Interface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): UniversalDeployer2 {
    return new Contract(address, _abi, runner) as unknown as UniversalDeployer2;
  }
}

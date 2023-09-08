import { ethers } from "ethers"
import { BasePacket } from "."

export type TransactionsPacket = BasePacket & {
  wallet: string;
  chainId: number;

  transactions: TransactionSubpacket[]
}

export type TransactionSubpacket = 
  RawTransactionSubpacket |
  SendERC20Subpacket |
  SendERC721Subpacket |
  SendERC1155Subpacket 


export type RawTransactionSubpacket = {
  type: 'transaction',
  to: string,
  value: string,
  data: string
}

export type SendERC20Subpacket = {
  type: 'erc20send',
  token: string,
  to: string,
  value: string
}

export type SendERC721Subpacket = {
  type: 'erc721send',
  token: string,
  to: string,
  id: string,
  safe?: boolean,
  data?: string
}

export type SendERC1155Subpacket = {
  type: 'erc1155send',
  token: string,
  to: string,
  vals: {
    id: string,
    amount: string
  }[],
  data?: string
}

export function sendTransactions(
  wallet: string,
  transactions: ethers.providers.TransactionRequest[],
  chainId: number
): TransactionsPacket {
  return {
    code: 'sendTransactions',
    wallet,
    chainId,
    transactions: transactions.map(tx => {
      if (!tx.to || tx.to === ethers.constants.AddressZero) {
        throw new Error('Contract creation not supported')
      }

      return {
        type: 'transaction',
        to: tx.to,
        value: ethers.BigNumber.from(tx.value || 0).toHexString(),
        data: ethers.utils.hexlify(tx.data || [])
      }
    })
  }
}

export function sendERC20(
  wallet: string,
  token: string,
  to: string,
  value: ethers.BigNumberish,
  chainId: number
): TransactionsPacket {
  return {
    code: 'sendTransactions',
    wallet,
    chainId,
    transactions: [
      {
        type: 'erc20send',
        token,
        to,
        value: ethers.BigNumber.from(value).toString()
      }
    ]
  }
}

export function sendERC721(
  wallet: string,
  token: string,
  to: string,
  id: string,
  chainId: number,
  safe?: boolean,
  data?: string
): TransactionsPacket {
  return {
    code: 'sendTransactions',
    wallet,
    chainId,
    transactions: [
      {
        type: 'erc721send',
        token,
        to,
        id,
        safe,
        data
      }
    ]
  }
}

export function sendERC1155(
  wallet: string,
  token: string,
  to: string,
  vals: {
    id: string,
    amount: ethers.BigNumberish
  }[],
  chainId: number,
  data?: string
): TransactionsPacket {
  return {
    code: 'sendTransactions',
    wallet,
    chainId,
    transactions: [
      {
        type: 'erc1155send',
        token,
        to,
        vals: vals.map(v => ({
          id: v.id,
          amount: ethers.BigNumber.from(v.amount).toString()
        })),
        data
      }
    ]
  }
}

export function combinePackets(
  packets: TransactionsPacket[]
): TransactionsPacket {
  if (packets.length === 0) {
    throw new Error('No packets provided')
  }

  // Ensure that all packets are for the same network and wallet
  const chainId = packets[0].chainId
  const wallet = packets[0].wallet

  if (!packets.every(p => p.chainId === chainId)) {
    throw new Error('All packets must have the same chainId')
  }

  if (!packets.every(p => p.wallet === wallet)) {
    throw new Error('All packets must have the same wallet')
  }

  return {
    code: 'sendTransactions',
    chainId,
    wallet,
    transactions: packets.reduce((acc, p) => acc.concat(p.transactions), [] as TransactionSubpacket[])
  }
}

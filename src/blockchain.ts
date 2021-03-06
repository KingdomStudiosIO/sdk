import { Blockchain, ChainId } from './constants'

/**
 * BlockchainSettings represents settings for a specific blockchain
 */
export class BlockchainSettings {
  chainId: number
  blockchain?: Blockchain
  rpcURLs?: string[]
  rpcAPIKey?: string
  blockTime?: number

  constructor(chainId: number, blockchain?: Blockchain, rpcURLs?: string[], rpcAPIKey?: string, blockTime?: number) {
    this.chainId = chainId
    this.blockchain = blockchain ? blockchain : this.defaultBlockchainType()
    this.rpcAPIKey = rpcAPIKey
    this.rpcURLs = rpcURLs ? rpcURLs : this.defaultRpcURLs()
    this.blockTime = blockTime ? blockTime : this.defaultBlockTime()
  }

  defaultBlockchainType(): Blockchain {
    switch (this.chainId) {
      case 56:
      case 97:
        return Blockchain.BINANCE_SMART_CHAIN
      case 1666600000:
      case 1666700000:
        return Blockchain.HARMONY
      default:
        return Blockchain.ETHEREUM
    }
  }

  defaultRpcURLs(): string[] {
    switch (this.chainId) {
      case 1:
        return this.rpcAPIKey && this.rpcAPIKey !== '' ?  [`https://mainnet.infura.io/v3/${this.rpcAPIKey}`] : ['https://mainnet.infura.io/v3/']
      case 3:
        return this.rpcAPIKey && this.rpcAPIKey !== '' ?  [`https://ropsten.infura.io/v3/${this.rpcAPIKey}`] : ['https://ropsten.infura.io/v3/']
      case 4:
        return this.rpcAPIKey && this.rpcAPIKey !== '' ?  [`https://rinkeby.infura.io/v3/${this.rpcAPIKey}`] : ['https://rinkeby.infura.io/v3/']
      case 5:
        return this.rpcAPIKey && this.rpcAPIKey !== '' ?  [`https://goerli.infura.io/v3/${this.rpcAPIKey}`] : ['https://goerli.infura.io/v3/']
      case 42:
        return this.rpcAPIKey && this.rpcAPIKey !== '' ?  [`https://kovan.infura.io/v3/${this.rpcAPIKey}`] : ['https://kovan.infura.io/v3/']
      case 56:
        return [
          'https://bsc-dataseed.binance.org/',
          'https://bsc-dataseed1.defibit.io/',
          'https://bsc-dataseed1.ninicoin.io/'
      ]
      case 97:
        return [
          'https://data-seed-prebsc-1-s1.binance.org:8545/',
          'https://data-seed-prebsc-2-s1.binance.org:8545/',
          'https://data-seed-prebsc-1-s2.binance.org:8545/'
        ]
      case 1666600000:
        return ['https://api.s0.t.hmny.io/']
      case 1666700000:
        return ['https://api.s0.b.hmny.io/']
      default:
        return this.rpcAPIKey && this.rpcAPIKey !== '' ?  [`https://mainnet.infura.io/v3/${this.rpcAPIKey}`] : ['https://mainnet.infura.io/v3/']
    }
  }

  defaultBlockTime(): number {
    switch (this.chainId) {
      case 56:
      case 97:
        return 3
      case 1666600000:
      case 1666700000:
        return 2
      default:
        return 13
    }
  }
}

export const BLOCKCHAIN_SETTINGS: { [chainId in ChainId]: BlockchainSettings } = {
  [ChainId.MAINNET]: new BlockchainSettings(ChainId.MAINNET),
  [ChainId.ROPSTEN]: new BlockchainSettings(ChainId.ROPSTEN),
  [ChainId.RINKEBY]: new BlockchainSettings(ChainId.RINKEBY),
  [ChainId.GÖRLI]: new BlockchainSettings(ChainId.GÖRLI),
  [ChainId.KOVAN]: new BlockchainSettings(ChainId.KOVAN),
  [ChainId.BSC_MAINNET]: new BlockchainSettings(ChainId.BSC_MAINNET),
  [ChainId.BSC_TESTNET]: new BlockchainSettings(ChainId.BSC_TESTNET),
  [ChainId.HARMONY_MAINNET]: new BlockchainSettings(ChainId.HARMONY_MAINNET),
  [ChainId.HARMONY_TESTNET]: new BlockchainSettings(ChainId.HARMONY_TESTNET),
}

export type Address = `0x${string}`;

export enum ChainId {
  MAINNET = 1,
  POLYGON = 137,
  ARBITRUM = 42161,

  // testnets
  GOERLI = 5,
}


export interface Chain {
  chainId: ChainId,
  name: string,
  multicall: Address,
  isTestnet: boolean,
}

export const CHAINS: { [key in ChainId]: Chain } = {
  [ChainId.MAINNET]: {
    chainId: ChainId.MAINNET,
    name: 'Ethereum',
    multicall: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
    isTestnet: false,
  },
  [ChainId.POLYGON]: {
    chainId: ChainId.POLYGON,
    name: 'Polygon',
    multicall: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
    isTestnet: false,
  },
  [ChainId.ARBITRUM]: {
    chainId: ChainId.ARBITRUM,
    name: 'Arbitrum',
    multicall: '0x842eC2c7D803033Edf55E478F461FC547Bc54EB2',
    isTestnet: false,
  },

  // testnets
  [ChainId.GOERLI]: {
    chainId: ChainId.GOERLI,
    name: 'Goerli',
    multicall: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
    isTestnet: true,
  }
}
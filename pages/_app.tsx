import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { Toaster } from "sonner"
import { WagmiConfig, configureChains, createConfig } from 'wagmi'

import { mainnet, polygon, arbitrum, goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const { chains, publicClient } = configureChains(
  [polygon, arbitrum, mainnet, goerli],
  [publicProvider()],
)



const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({
    chains, options: {
      shimDisconnect: true,
      UNSTABLE_shimOnConnectSelectAccount: true,
    },
  }),],
  publicClient
})

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Toaster position="top-left" />
    <GeistProvider>
      <CssBaseline />
      <WagmiConfig config={config}>
        <Component {...pageProps} />
      </WagmiConfig>
    </GeistProvider>
  </>
}

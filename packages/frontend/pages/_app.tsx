import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { ChainId, Config, DAppProvider } from '@usedapp/core'
import type { AppProps } from 'next/app'
import React from 'react'
import { useApollo } from '../lib/apolloClient'

const config: Config = {
  supportedChains: [
    ChainId.Mainnet,
    ChainId.Goerli,
    ChainId.Kovan,
    ChainId.Rinkeby,
    ChainId.Ropsten,
    ChainId.xDai,
    ChainId.BSC,
    ChainId.Localhost,
    ChainId.Hardhat,
  ],
}

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <DAppProvider config={config}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </DAppProvider>
    </ApolloProvider>
  )
}

export default MyApp

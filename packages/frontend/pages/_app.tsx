import { ApolloProvider } from '@apollo/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import "@fontsource/syne"
import "@fontsource/syne/500.css"
import "@fontsource/syne/600.css"
import "@fontsource/syne/700.css"
import "@fontsource/syne/800.css"
import {
  ChainId,
  Config,
  DAppProvider,
  MULTICALL_ADDRESSES,
} from '@usedapp/core'
import type { AppProps } from 'next/app'
import React from 'react'
import { MulticallContract } from '../artifacts/contracts/contractAddress'
import { useApollo } from '../lib/apolloClient'


// scaffold-eth's INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
export const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'

const config: Config = {
  readOnlyUrls: {
    [ChainId.Ropsten]: `https://ropsten.infura.io/v3/${INFURA_ID}`,
    [ChainId.Hardhat]: 'http://localhost:8545',
    [ChainId.Localhost]: 'http://localhost:8545',
  },
  supportedChains: [
    ChainId.Mainnet,
    ChainId.Goerli,
    ChainId.Kovan,
    ChainId.Rinkeby,
    ChainId.Ropsten,
    ChainId.xDai,
    ChainId.Localhost,
    ChainId.Hardhat,
  ],
  multicallAddresses: {
    ...MULTICALL_ADDRESSES,
    [ChainId.Hardhat]: MulticallContract,
    [ChainId.Localhost]: MulticallContract,
  },
}

const theme = extendTheme({
  fonts: {
    heading: 'Syne, sans-serif',
    body: 'Syne, sans-serif',
  },
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.800')(props),
      lineHeight: 'base',
    },
    '*::placeholder': {
      color: mode('gray.400', 'whiteAlpha.400')(props),
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      wordWrap: 'break-word',
    },
  }),
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
      }
    },
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: 'bold', // Normally, it is "semibold"
      },
      // 2. We can add a new button size or extend existing
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
      },
      // 3. We can add a new visual variant
      variants: {
        'with-shadow': {
          bg: 'red.400',
          boxShadow: '0 0 2px 2px #efdfde',
        },
        // 4. We can override existing variants
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
        }),
      },
    },
  },
})

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <DAppProvider config={config}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </DAppProvider>
    </ApolloProvider>
  )
}

export default MyApp

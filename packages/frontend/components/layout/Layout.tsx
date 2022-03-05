import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { useEthers, useNotifications } from '@usedapp/core'
import blockies from 'blockies-ts'
import NextLink from 'next/link'
import React from 'react'
import Balance from '../Balance'
import ConnectWallet from '../ConnectWallet'
import Head, { MetaProps } from './Head'

// Extends `window` to add `ethereum`.
declare global {
  interface Window {
    ethereum: any
  }
}

/**
 * Constants & Helpers
 */

// Title text for the various transaction notifications.
const TRANSACTION_TITLES = {
  transactionStarted: 'Local Transaction Started',
  transactionSucceed: 'Local Transaction Completed',
}

// Takes a long hash string and truncates it.
function truncateHash(hash: string, length = 38): string {
  return hash.replace(hash.substring(6, length), '...')
}

/**
 * Prop Types
 */
interface LayoutProps {
  children: React.ReactNode
  customMeta?: MetaProps
}

/**
 * Component
 */
const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  const { account, deactivate } = useEthers()
  const { notifications } = useNotifications()

  let blockieImageSrc
  if (typeof window !== 'undefined') {
    blockieImageSrc = blockies.create({ seed: account }).toDataURL()
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      bgGradient={[
        'linear(to-tr, teal.300, yellow.400)',
        'linear(to-t, blue.200, teal.500)',
        'linear(to-b, orange.100, purple.300)',
      ]}>
      <Head customMeta={customMeta} />
      <Container maxWidth="container.xl" flex="initial">
        <header>
          <SimpleGrid
            columns={[1, 1, 1, 2]}
            alignItems="center"
            justifyContent="space-between"
            py="8"
          >
            <Flex py={[4, null, null, 0]}>
              <NextLink href="/" passHref>
                <Link px="4" py="1">
                  Home
                </Link>
              </NextLink>
              <NextLink href="/graph-example" passHref>
                <Link px="4" py="1">
                  Graph Example
                </Link>
              </NextLink>
              <NextLink href="/signature-example" passHref>
                <Link px="4" py="1">
                  Signature Example
                </Link>
              </NextLink>
            </Flex>
            {account ? (
              <Flex
                order={[-1, null, null, 2]}
                alignItems={'center'}
                justifyContent={['flex-start', null, null, 'flex-end']}
              >
                <Balance />
                <Image ml="4" src={blockieImageSrc} alt="blockie" />
                <Menu placement="bottom-end">
                  <MenuButton as={Button} ml="4">
                    {truncateHash(account)}
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={deactivate}>Disconnect</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            ) : (
              <ConnectWallet />
            )}
          </SimpleGrid>
        </header>
      </Container>
      <Container maxWidth="container.xl" flex="auto">
        <Center>
          <main>
          {children}
          </main>
        </Center>
        {notifications.map((notification) => {
          if (notification.type === 'walletConnected') {
            return null
          }
          return (
            <Alert
              key={notification.id}
              status="success"
              position="fixed"
              bottom="8"
              right="8"
              width="400px"
            >
              <AlertIcon />
              <Box>
                <AlertTitle>
                  {TRANSACTION_TITLES[notification.type]}
                </AlertTitle>
                <AlertDescription overflow="hidden">
                  Transaction Hash:{' '}
                  {truncateHash(notification.transaction.hash, 61)}
                </AlertDescription>
              </Box>
            </Alert>
          )
        })}
      </Container>
      <Container py="8" maxWidth="container.xl" flex="initial">
        <footer>
          <Center>
            <Text>
              MouseBelt Engineering
            </Text>
          </Center>
        </footer>
      </Container>
    </Box>
  )
}

export default Layout

import { Box, Button, Heading } from '@chakra-ui/react'
import React, { useReducer } from 'react'
import Layout from '../components/layout/Layout'

function HomeIndex(): JSX.Element {
  return (
    <Layout>
      <Box display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt="10"
       >
        <Heading as="h1" size="4xl" fontWeight="extrabold" lineHeight="2">
          CODEX
        </Heading>
        <Heading as="h2" size="l">
          (a.k.a. ICON DEX) Coming Soon
        </Heading>
      </Box>
    </Layout>
  )
}

export default HomeIndex

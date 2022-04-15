import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <Flex
        direction={"column"}
    >
        <Header />
        <Flex
            grow={1}
        >
            {children}
        </Flex>
    </Flex>
  )
}

export default Layout
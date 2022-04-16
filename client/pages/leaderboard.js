import React from 'react';
import Layout from '../components/Layout';
import Leaderboard from '../components/Leaderboard';
import { chakra, Flex, useColorModeValue } from '@chakra-ui/react'

const Leader = () => {
    const textColor = useColorModeValue("gray.700", "gray.50");
    return (
        <Layout>
            <Flex
                px={{
                    base: '16px',
                    md: '48px',
                    lg: '64px'
                }}
                alignItems={'center'}
                justifyContent={'center'}
                w='100%'
                pt={'20px'}
                flexDirection={'column'}
            >
                <chakra.h1
                    fontSize={{
                        base: 36,
                        md: 48

                    }}

                    textAlign={'center'}
                    fontWeight={"bold"}
                    color={textColor}
                    pb={'40px'}>Leaderboard</chakra.h1>

                <Leaderboard />

            </Flex>

        </Layout>
    )
}

export default Leader;
import React from 'react';
import { Box, Button, chakra, Flex, useColorModeValue, Link } from '@chakra-ui/react'
import NextLink from 'next/link';
import Layout from '../components/Layout';
import { ArrowRightIcon } from '@chakra-ui/icons';

const Dataquest = () => {
    const textColor = useColorModeValue("gray.700", "gray.50");
    
    return (
        <Layout>
            <Flex
                minH={'calc(100vh - 80px)'}
                alignItems={'center'}
                justifyContent={'center'}
                w='100%'
                flexDirection={'column'}
                px={{
                    base: '16px',
                    md: '48px',
                    lg: '64px'
                }}
                gap={'8'}>
                <chakra.h1
                   
                    fontSize={{
                        base: 36,
                        md: 48
                    
                    }}
                    
                    textAlign={'center'}
                    fontWeight={"bold"}
                    color={textColor}>
                    Submissions For data quest Starts From 17th April.
                </chakra.h1>
                
                <chakra.h3
                        fontWeight={"bold"}
                        fontSize={20}
                        color={textColor}
                        textAlign={'center'}>
                        Problem Statement has been Released
                    </chakra.h3>

                <Link href="https://pulzion.in/events" target='_blank'>
                    <chakra.h3
                        fontWeight={"bold"}
                        fontSize={20}
                        textTransform={"uppercase"}
                        color={"purple.400"}
                        textAlign={'center'}>
                        Get more details from website
                    </chakra.h3>
                </Link>

              
            </Flex>

        </Layout>

    )
}

export default Dataquest;
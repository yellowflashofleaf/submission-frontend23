import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    
    TableContainer,
    ChakraProvider,
} from '@chakra-ui/react';

const Leaderboard = () => {
    
    return (
        <TableContainer
        w={'100%'}>
     
            <Table variant='striped' colorScheme='teal' >
                {/* <TableCaption>Admin Leaderboard</TableCaption> */}
                <Thead >
                    <Tr>
                        <Th isNumeric textAlign={'center'}>Rank</Th>
                        <Th textAlign={'center'}>Email</Th>
                        <Th textAlign={'center'}>First Name</Th>
                        <Th textAlign={'center'}>Last Name</Th>
                        <Th textAlign={'center'}>Accuracy</Th>

                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td textAlign={'center'}>inches</Td>
                        <Td textAlign={'center'}>millimetres (mm)</Td>
                        <Td textAlign={'center'}>25.4</Td>
                        <Td textAlign={'center'}>0.91444</Td>
                        <Td textAlign={'center'}>0.91444</Td>
                    </Tr>
                    <Tr>
                        <Td textAlign={'center'}>feet</Td>
                        <Td textAlign={'center'}>centimetres (cm)</Td>
                        <Td textAlign={'center'} >30.48</Td>
                        <Td textAlign={'center'} >0.91444</Td>
                        <Td textAlign={'center'}>0.91444</Td>
                    </Tr>
                    <Tr>
                        <Td textAlign={'center'}>yards</Td>
                        <Td textAlign={'center'}>metres (m)</Td>
                        <Td textAlign={'center'} >0.91444</Td>
                        <Td textAlign={'center'} >0.91444</Td>
                        <Td textAlign={'center'}>0.91444</Td>
                    </Tr>
                    
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th textAlign={'center'} >Rank</Th>
                        <Th textAlign={'center'}>Email</Th>
                        <Th textAlign={'center'}>First Name</Th>
                        <Th textAlign={'center'}>Last Name</Th>
                        <Th textAlign={'center'}>Accuracy</Th>
                        
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}

export default Leaderboard;
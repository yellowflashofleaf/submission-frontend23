import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";

const Leaderboard = ({ submissions, senior }) => {
  const textColor = useColorModeValue("gray.700", "gray.50");

  return (
    <TableContainer w={"100%"}>
      <Table variant="simple" color={textColor}>
        {/* <TableCaption>Admin Leaderboard</TableCaption> */}
        <Thead>
          <Tr>
            <Th textAlign={"center"}>Rank</Th>
            <Th textAlign={"center"}>Email</Th>
            <Th textAlign={"center"}>First Name</Th>
            <Th textAlign={"center"}>Last Name</Th>
            <Th textAlign={"center"}>{"Accuracy"}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {submissions?.map((submission, index) => {
            console.log("In leader board ", submission);
            const acc = submission?.max;
            return (
              <Tr key={index}>
                <Td textAlign={"center"}>{index + 1}</Td>
                <Td textAlign={"center"}>{submission.email}</Td>
                <Td textAlign={"center"}>{submission.first_name}</Td>
                <Td textAlign={"center"}>{submission.last_name}</Td>
                <Td textAlign={"center"}>{acc.toPrecision(5)}</Td>
              </Tr>
            );
          })}
        </Tbody>

        <Tfoot>
          <Tr>
            <Th textAlign={"center"}>Rank</Th>
            <Th textAlign={"center"}>Email</Th>
            <Th textAlign={"center"}>First Name</Th>
            <Th textAlign={"center"}>Last Name</Th>
            <Th textAlign={"center"}>Accuracy</Th>
            {/* <Th textAlign={'center'}>{"Accuracy"}</Th> */}
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;

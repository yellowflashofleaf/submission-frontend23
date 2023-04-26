import {
  Box,
  Button,
  chakra,
  Flex,
  Grid,
  GridItem,
  Link,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import privateUserRoute from "../routers/privateUserRoute";
import { Formik } from "formik";
import { toast } from "react-toastify";
import FileInput from "../components/FileInput";
import NextLink from "next/link";
import { uploadFile } from "../action/uploadFile";
import ButtonWithModal from "../components/ButtonWithModal";
import { getEntries, submitEntries } from "../action/entries";
import ContentLoader from "../components/ContentLoader";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const Webapp = () => {
  const textColor = useColorModeValue("gray.700", "gray.50");
  const [submission, setSubmission] = useState();
  const [loading, setLoading] = useState(true);
  const handleSubmit = async (values) => {
    if (!values?.file?.name) {
      toast.error("Please Select a file");
      return;
    }
    console.log(values.file.size);
    if (values.file.size > 5000000) {
      toast.error("File Size Exceeded");
      return;
    }
    try {
      setLoading(true);
      const data = await uploadFile(values.file);
      if (data?.error) {
        toast.error("Someting Went Wrong");
        setLoading(false);
        return;
      }
      const entryData = await submitEntries(data, "webapp");
      if (entryData?.error) {
        toast.error(entryData?.error);
        setLoading(false);
        return;
      }
      setSubmission(entryData.submission);
      toast.success("Entry Submitted Successfully");
    } catch (e) {
      console.log(e);
      toast.error("Someting Went Wrong");
    }
    setLoading(false);
  };
  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const entryData = await getEntries("webapp");
        if (entryData?.error) {
          console.log(entryData?.error);
        }
        setSubmission(entryData?.submission);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchSubmission();
  }, [setSubmission]);
  const [tabIndex, setTabIndex] = useState(0);
  return !loading ? (
    <Layout>
      <Box
        pt={10}
        width={"full"}
        pb={"20px"}
        px={{
          base: "16px",
          md: "48px",
          lg: "64px",
        }}
      >
        <NextLink href="/dashboard">
          <chakra.h3
            fontWeight={"bold"}
            fontSize={20}
            textTransform={"uppercase"}
            color={"purple.400"}
            cursor="pointer"
            display={"flex"}
            alignItems={"center"}
          >
            <ChevronLeftIcon w={6} h={6} /> <span>Back to all events</span>
          </chakra.h3>
        </NextLink>
        <chakra.h1 py={5} fontSize={48} fontWeight={"bold"} color={textColor}>
          Web N App
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
          <GridItem>
            <Tabs onChange={(index) => setTabIndex(index)}>
              <TabList>
                <Tab>Topics</Tab>
                <Tab>Instructions</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Stack spacing={3}>
                    <Text fontSize="2xl">Topics</Text>
                    <Text fontSize="xl">Topics for FE/SE category:</Text>
                    <Text fontSize="lg">
                      1. Social media post and exploration section
                    </Text>
                    <Text fontSize="lg">2. Blog Website</Text>
                    <Text fontSize="lg">
                      3. Online marketplace (vehicle or any other category)
                    </Text>
                    <Text fontSize="xl">
                      For (SE/TE/BE - Full Stack) judged on full - stack
                      application implementation. Topics for SE/TE/BE category:
                    </Text>
                    <Text fontSize="lg">
                      1. A taskmaster that allows users to create and manage
                      their tasks + expense tracker
                    </Text>
                    <Text fontSize="lg">
                      2. Crypto Tracker (Keep tracks of Cryptocurrency i.e time,
                      value, data)
                    </Text>
                    <Text fontSize="lg">
                      3. A community service platform for public welfare.
                    </Text>
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <Stack spacing={3}>
                    <Text fontSize="2xl">Instructions</Text>
                    <Text fontSize="lg" fontWeight="bold">
                      1. All team member's details should be present in PPT.
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">
                      2. PPT should be of size 6-7 slides.
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">
                      3. PPT should contain the github link of the project.
                    </Text>
                    <Text fontSize="lg">
                      4. Topics are out, the idea submission deadline is 1st May
                      2023 (11:59 pm)
                    </Text>
                    <Text fontSize="lg">
                      5. Participants will have to choose only a topic (listed
                      above in 'Rounds) and make a presentation on their idea as
                      well as a basic prototype of their project.
                    </Text>
                    <Text fontSize="lg">
                      6. Ppt slides can include web/app screenshots as well as
                      idea presentation.
                    </Text>
                    <Text fontSize="lg">
                      7. Participants should rename their entry as
                      GroupName_teamLeaderName.extension
                    </Text>
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
          {submission?.id ? (
            <GridItem>
              <Flex
                minH={"200px"}
                border={"2px solid primaries.100"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                gap={5}
              >
                <Text fontSize={"2xl"} textAlign={"center"}>
                  You have already submitted your entry
                </Text>
                <Link
                  href={submission.submission}
                  bg={"blue.400"}
                  px={4}
                  py={2}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  borderRadius={"md"}
                >
                  Downlooad
                </Link>
              </Flex>
            </GridItem>
          ) : (
            <GridItem>
              <Formik initialValues={{ file: {} }} onSubmit={handleSubmit}>
                {({ handleBlur, handleChange, values, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={10}>
                      <FileInput
                        accept={".ppt,.pptx"}
                        label="Upload Your PPT ( .ppt, .pptx upto 5mb )"
                        name="file"
                        onBlur={handleBlur}
                      />
                      <ButtonWithModal
                        handleSubmit={() => handleSubmit(values)}
                      />
                    </Stack>
                  </form>
                )}
              </Formik>
            </GridItem>
          )}
        </SimpleGrid>
      </Box>
    </Layout>
  ) : (
    <ContentLoader />
  );
};

export default privateUserRoute(Webapp);

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
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import privateUserRoute from "../../routers/privateUserRoute";
import { Formik } from "formik";
import { toast } from "react-toastify";
import FileInput from "../../components/FileInput";
import NextLink from "next/link";
import { uploadFile } from "../../action/uploadFile";
import ButtonWithModal from "../../components/ButtonWithModal";
import { getEntries, submitEntries } from "../../action/entries";
import ContentLoader from "../../components/ContentLoader";
import { ChevronLeftIcon, DownloadIcon } from "@chakra-ui/icons";
import { dateString } from "../../utils/dateString";
import AppContext from "../../context/AppContext";

const Dataquest = () => {
  const textColor = useColorModeValue("gray.700", "gray.50");
  const [submissions, setSubmissions] = useState();
  const [loading, setLoading] = useState(true);
  const cardBg = useColorModeValue("white.100", "secondaries.800");
  const { user } = useContext(AppContext);
  const senior = user.year === "TE" || user.year === "BE";
  const handleSubmit = async (values) => {
    if (!values?.file_csv?.name) {
      toast.error("Please Select a CSV file");
      return;
    }
    if (!values?.file_python?.name) {
      toast.error("Please Select a python or notebook file");
      return;
    }
    if (values.file_csv.size > 5000000) {
      toast.error("File Size of CSV Exceeded");
      return;
    }
    if (values.file_python.size > 5000000) {
      toast.error("File Size of pyhon/notebook file Exceeded");
      return;
    }
    try {
      setLoading(true);
      const data = await uploadFile(values.file_csv);
      if (data?.error) {
        toast.error("Someting Went Wrong");
        setLoading(false);
        return;
      }
      const data_python = await uploadFile(values.file_python);
      if (data_python?.error) {
        toast.error("Someting Went Wrong");
        setLoading(false);
        return;
      }
      const entryData = await submitEntries(
        {
          submission_csv: data.submission,
          submission_python: data_python.submission,
        },
        "dataquest2"
      );
      if (entryData?.error) {
        toast.error(entryData?.error);
        setLoading(false);
        return;
      }
      setSubmissions(
        submissions?.length > 0
          ? [...submissions, entryData.submission]
          : [entryData.submission]
      );
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
        const entryData = await getEntries("dataquest2");
        if (entryData?.error) {
          console.log(entryData?.error);
        }
        setSubmissions(entryData?.submissions);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchSubmission();
  }, [setSubmissions]);
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
        <Box py={5}>
          <chakra.h1 fontSize={48} fontWeight={"bold"} color={textColor}>
            DataQuest Round 2 {senior ? "( TE-BE )" : "( FE-SE )"}
          </chakra.h1>
          <NextLink href="/dataquest/leaderboard">
            <chakra.span
              fontWeight={"bold"}
              fontSize={20}
              textTransform={"uppercase"}
              color={"purple.400"}
              cursor="pointer"
            >
              <span>View Leaderboard</span>
            </chakra.span>
          </NextLink>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
          <GridItem>
            <Tabs onChange={(index) => setTabIndex(index)}>
              <TabList>
                <Tab>Problem</Tab>
                <Tab>Rules</Tab>
                <Tab>My Submissions</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Stack spacing={3}>
                    <Text fontSize="2xl">Problem Statement</Text>
                    <Text fontSize="lg">
                      click{" "}
                      <Link
                        href="https://docs.google.com/document/d/1_vNpl-JGbOAtk9AMLtiRQlVuskFqUt_EAwlHkmuZtsE/edit?usp=sharing"
                        target={"_blank"}
                        color={"blue.500"}
                      >
                        here
                      </Link>{" "}
                      to view the problem statement and dataset.
                    </Text>
                    <Text fontSize="lg">
                      - Participants have to predict the repeat purchase from
                      the given dataset
                    </Text>
                    <Text fontSize="lg">
                      - Participants will be given link to 3 datasets namely
                      train.csv, test.csv and sample_submission.csv
                    </Text>
                    <Text fontSize="lg">
                      - Participants have to use train and test files and build
                      a model based on it and by referring to the sample
                      submission they would have to submit a submission.csv file
                      and a .ipynb/.py file on our submission platform.
                    </Text>
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <Stack spacing={3}>
                    <Text fontSize="2xl">Rules</Text>
                    <Text fontSize="lg">
                      1. The competition will be hosted on the Pulzion
                      Submission platform.
                    </Text>
                    <Text fontSize="lg">
                      <b>
                        2. The problem statement along with the dataset will
                        also be available on our submission platform.
                      </b>
                    </Text>
                    <Text fontSize="lg">
                      3. Participants are expected to submit their CSV files on
                      the Pulzion'23 Submission Platform along with .ipynb/.py
                      file.
                    </Text>
                    <Text fontSize="lg">
                      4. The best score out of the submissions will be
                      considered for evaluation.
                    </Text>
                    <Text fontSize="lg">
                      5. Two rounds are to be conducted with different datasets
                      for each category.
                    </Text>
                    <Text fontSize="lg">
                      6. Participants will be filtered out from Round 1
                      according to the decided metrics.
                    </Text>
                    <Text fontSize="lg">
                      7. Winners will be decided based in the decided metrics.
                      The decision of the team will be final.
                    </Text>
                    <Text fontSize="lg">
                      <b>
                        8. Participants have to submit the submission csv in the
                        given format only.
                      </b>
                    </Text>
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <Stack spacing={3}>
                    {submissions?.map((submission) => {
                      const acc = submission.public_accuracy;
                      return (
                        <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          p={6}
                          rounded={"lg"}
                          bg={cardBg}
                          gap={5}
                          key={submission?.id?.toString()}
                          boxShadow={"md"}
                        >
                          <Flex flexDirection={"column"} gap={5}>
                            <Text fontSize="lg">
                              {dateString(submission.created_at)}
                            </Text>
                            <Text fontSize="lg">
                              {senior ? "F1 Score: " : "Mean Square Error : "}{" "}
                              {acc.toPrecision(5)}
                            </Text>
                          </Flex>
                          <Link href={submission.submission_csv}>
                            <DownloadIcon fontSize={"lg"} />
                          </Link>
                        </Flex>
                      );
                    })}
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
          <GridItem>
            <Formik
              initialValues={{
                file_csv: {},
                file_python: {},
              }}
              onSubmit={handleSubmit}
            >
              {({ handleBlur, handleChange, values, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={5}>
                    <Box>
                      <chakra.h3
                        color={textColor}
                        fontSize={"3xl"}
                        fontWeight={"bold"}
                      >
                        Submit your Entry
                      </chakra.h3>
                      <Text fontSize={"lg"}>maximum 8 entries per day</Text>
                    </Box>
                    <FileInput
                      accept={".csv"}
                      label="Upload Your CSV ( .csv upto 5mb )"
                      name="file_csv"
                      onBlur={handleBlur}
                    />
                    <FileInput
                      accept={".py,.ipynb"}
                      label="Upload Your python or notebook file ( .py, .ipynb upto 5mb )"
                      name="file_python"
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
        </SimpleGrid>
      </Box>
    </Layout>
  ) : (
    <ContentLoader />
  );
};

export default privateUserRoute(Dataquest);

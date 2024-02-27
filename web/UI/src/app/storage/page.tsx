"use client";

import React, { useState } from "react";
import {
  Button,
  Text,
  Divider,
  VStack,
  Box,
  Flex,
  HStack,
  Tag,
  TagLeftIcon,
  TagLabel,
  IconButton,
} from "@chakra-ui/react";
import { Download, Trash2, FilePlus, CheckCircle2, Upload } from "lucide-react";



const fileList = [
  {
    name: "small_dataset.csv",
    date: "Oct 10, 2023, 10:54 AM",
    hash: "KBPDbHzGynuepRLWkfEOGRB",
    status: "Ready",
    size: "1,590 bytes",
  },
  {
    name: "huge_dataset.csv",
    date: "Oct 11, 2023, 11:30 AM",
    hash: "KBPDbHzGynuepRLWkfEOGRB",
    status: "Ready",
    size: "2.91 GB",
  },
  {
    name: "huge_dataset.csv",
    date: "Oct 11, 2023, 11:30 AM",
    hash: "KBPDbHzGynuepRLWkfEOGRB",
    status: "Ready",
    size: "2.91 GB",
  },
  {
    name: "huge_dataset.csv",
    date: "Oct 11, 2023, 11:30 AM",
    hash: "KBPDbHzGynuepRLWkfEOGRB",
    status: "Ready",
    size: "2.91 GB",
  },
  {
    name: "huge_dataset.csv",
    date: "Oct 11, 2023, 11:30 AM",
    hash: "KBPDbHzGynuepRLWkfEOGRB",
    status: "Ready",
    size: "2.91 GB",
  },
  {
    name: "huge_dataset.csv",
    date: "Oct 11, 2023, 11:30 AM",
    hash: "KBPDbHzGynuepRLWkfEOGRB",
    status: "Ready",
    size: "2.91 GB",
  },
];

const DashboardPage = () => {
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    date: string;
    size: string;
    hash: string;
    status: string;
  } | null>(null);

  const handleFileClick = (file: {
    name: string;
    date: string;
    size: string;
    hash: string;
    status: string;
  }) => {
    setSelectedFile(file);
  };

  return (
    <Flex h="100vh">
      <Flex flex="1" p="5">
        {/* Left panel - File list */}
        <VStack align="stretch" w="60%" pr="2.5" spacing="5">
          <Text fontSize="2xl" fontWeight="bold">
            Storage
          </Text>
          {fileList.map((file, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => handleFileClick(file)}
            >
              <Flex justifyContent="space-between" width="100%">
                <Text fontSize="l">{file.name}</Text>
                <Text color="gray.500">{file.date}</Text>
              </Flex>
            </Button>
          ))}
          <Button variant="ghost">Load more</Button>
        </VStack>
        <Divider orientation="vertical" />
        {/* Right panel - File details */}
        <VStack align="stretch" w="40%" pl="2.5" spacing="5">
          <Text fontSize="2xl" fontWeight="bold">
            File Info
          </Text>
          {selectedFile && (
            <Box p="5">
              <VStack align="stretch" spacing="4">
                <Text fontSize="xl" fontWeight="bold">
                  {selectedFile.name}
                </Text>
                <Divider />
                <HStack justifyContent="space-between">
                  <VStack align="start" spacing="2">
                    <Text>File Hash</Text>
                    <Text fontWeight="bold">{selectedFile.hash}</Text>
                    <Text>Status</Text>
                    <Tag size="lg" variant="subtle" colorScheme="green">
                      <TagLeftIcon boxSize="12px" as={CheckCircle2} />
                      <TagLabel>Ready</TagLabel>
                    </Tag>
                    <Text>Size</Text>
                    <Text>{selectedFile.size}</Text>
                    <Text>Created at</Text>
                    <Text>{selectedFile.date}</Text>
                  </VStack>
                  <HStack>
                    <IconButton aria-label="Download" icon={<Download />} />
                    <IconButton
                      aria-label="Delete"
                      icon={<Trash2 />}
                      colorScheme="red"
                    />
                    <IconButton
                      aria-label="Add To Runtime"
                      icon={<FilePlus />}
                      colorScheme="blue"
                    />
                  </HStack>
                </HStack>
              </VStack>
            </Box>
          )}
        </VStack>
        <Button leftIcon={<Upload></Upload>} colorScheme="blue" size="md">
          <Text fontSize="xl" fontWeight="bold">
            Upload
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default DashboardPage;

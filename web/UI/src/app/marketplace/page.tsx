"use client";

import {
  SearchIcon,
  ChevronDownIcon,
  StarIcon,
  TimerIcon,
  DownloadIcon,
} from "lucide-react";
import {
  Box,
  Flex,
  Text,
  Input,
  Icon,
  Button,
  Badge,
  Stack,
  Divider,
} from "@chakra-ui/react";

import { Checkbox } from "@chakra-ui/react";

const ModelOptions = [
  "Multimodal",
  "Computer Vision",
  "NLP",
  "Datasets",
  "Languages",
  "Licenses",
  "Other",
];

const DashboardPage = () => {
  return (
    <Flex>
      <Box w="200px" borderRight="1px" borderColor="gray.200" p="4">
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Marketplace
        </Text>
        <Input placeholder="Filter" mb="4" />
        <Text fontWeight="bold" mb="2">
          Tasks
        </Text>
        {ModelOptions.slice(0, 3).map((option) => (
          <Checkbox key={option} mb="2">
            {option}
          </Checkbox>
        ))}
        <Divider my="4" />
        <Text fontWeight="bold" mb="2">
          Libraries
        </Text>
        {ModelOptions.slice(3).map((option) => (
          <Checkbox key={option} mb="2">
            {option}
          </Checkbox>
        ))}
      </Box>
      <Box flex="1" p="4">
        <Flex justifyContent="space-between" mb="4">
          <Text fontSize="2xl" fontWeight="bold">
            Models
          </Text>
          <Text fontSize="lg" color="gray.500">
            520,810
          </Text>
        </Flex>
        <Flex mb="4">
          <Input placeholder="Filter by name" size="lg" mr="2" />
        </Flex>
        <Stack spacing="4">
          <ModelCard />
          <ModelCard />
          <ModelCard />
          <ModelCard />
          <ModelCard />
          <ModelCard />
          <ModelCard />
          <ModelCard />
        </Stack>
      </Box>
    </Flex>
  );
};
function ModelCard() {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Icon as={StarIcon} color="yellow.400" mr="2" />
          <Box>
            <Text fontWeight="bold">google/eemma-7b</Text>
            <Text fontSize="sm" color="gray.500">
              Text Generation · Updated 3 days ago
            </Text>
          </Box>
        </Flex>
        <Flex alignItems="center">
          <Badge mr="2">new</Badge>
          <Icon as={TimerIcon} color="gray.500" mr="1" />
          <Text fontSize="sm" color="gray.500" mr="4">
            1.19k
          </Text>
          <Icon as={DownloadIcon} color="gray.500" mr="1" />
          <Text fontSize="sm" color="gray.500">
            188
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
export default DashboardPage;

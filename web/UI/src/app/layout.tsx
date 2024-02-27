// app/layout.tsx

"use client";

import { ChakraProvider } from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import { Box, VStack, Icon, Flex, Button, useToast } from "@chakra-ui/react";
import { Home, Store, Cpu, HardDrive, LogIn } from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

import Web3 from "web3";
import { accounts } from "aleph-sdk-ts";



interface CustomWindow extends Window {
  ethereum?: any;
}
declare var window: CustomWindow;


const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState("/dashboard");
  const [walletAddress, setWalletAddress] = useState("");

  const toast = useToast();



  const account = accounts.ethereum.ImportAccountFromPrivateKey("0x2d805989e8b5719c4d07b24f8228327fa32afd8b53c034ccfabb1b1944212a1b") ;

  console.log(account);




  const [tokenBalance, setTokenBalance] = useState(
    localStorage.getItem("tokenBalance") || "0"
  );

    

  const fetchETHBalance = async () => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      const web3 = new Web3(window.ethereum);
      const walletAddress = window.ethereum.selectedAddress;
      if (!walletAddress) {
        console.error("No wallet address found.");
        return;
      }
      const balance = await web3.eth.getBalance(walletAddress);
      localStorage.setItem(
        "tokenBalance",
        web3.utils.fromWei(balance, "ether")
      );

      setTokenBalance(web3.utils.fromWei(balance, "ether"));
    }
  };

  useEffect(() => {
    const storedWalletAddress = localStorage.getItem("walletAddress");
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
    }
    // This effect could be enhanced to listen to actual routing changes
    // if using React Router or a similar library
    setCurrentPage(window.location.pathname);
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addresses = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (!addresses || addresses.length === 0) {
          throw new Error("No accounts found.");
        }
        setWalletAddress(addresses[0]);
        // Store wallet address in localStorage
        localStorage.setItem("walletAddress", addresses[0]);
        toast({
          title: "Wallet Connected",
          description: `Address: ${addresses[0]}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Error connecting to wallet",
          description: (error as Error).message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      console.error("MetaMask is not installed!");
      toast({
        title: "MetaMask not detected",
        description: "Please install MetaMask to use this feature.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <Flex h="100vh">
            <Box w="200px" bg="gray.100" p={5}>
              <VStack align="stretch" spacing={5}>
                {[
                  { icon: Home, text: "Dashboard", path: "/" },
                  { icon: Store, text: "Marketplace", path: "/marketplace" },
                  { icon: Cpu, text: "Runtime", path: "/runtime" },
                  { icon: HardDrive, text: "Storage", path: "/storage" },
                ].map((item, index) => (
                  <Flex align="center" key={index}>
                    <Icon as={item.icon} boxSize={6} mr={2} />
                    <Button
                      fontSize="md"
                      colorScheme={currentPage === item.path ? "blue" : "gray"}
                      onClick={() => (window.location.href = item.path)} // Modified onClick event handler
                    >
                      {item.text}
                    </Button>
                  </Flex>
                ))}

                <Flex justify="center" align="bottom" mt={500}>
                  {walletAddress ? (
                    <Menu>
                      <MenuButton as={Button} colorScheme="blue" size="sm" onClick={fetchETHBalance}>
                        {`${walletAddress.substring(
                          0,
                          8
                        )}...${walletAddress.substring(
                          walletAddress.length - 6
                        )}`}
                      </MenuButton>
                      <MenuList>
                        <MenuItem>ETH: {tokenBalance}</MenuItem>
                        <MenuDivider />
                      </MenuList>
                    </Menu>
                  ) : (
                    <Button
                      onClick={connectWallet}
                      rightIcon={<Icon as={LogIn} boxSize={4} />}
                      colorScheme="blue"
                      variant="solid"
                      size="sm"
                    >
                      Login
                    </Button>
                  )}
                </Flex>
              </VStack>
            </Box>

            <Box flex="1" p={5}>
              {children}
            </Box>
          </Flex>
        </ChakraProvider>
      </body>
    </html>
  );
};

export default Dashboard;

import { useState } from "react";

import {
  ChakraProvider,
  extendTheme,
  Box,
  VStack,
  Button,
  Text,
  useToast,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaCopy, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

const MotionBox = motion(Box);

// 🎨 Custom Dark Theme
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#1A1A1A",
        color: "#E0E0E0",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          opacity: 0.9,
        },
      },
    },
  },
});

function App() {
  const [passphrase] = useState(bip39.generateMnemonic());
  const [wallets, setWallets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPhrase, setShowPhrase] = useState(true);
  const [showPrivateKey, setShowPrivateKey] = useState({});
  const toast = useToast();

  const copyPassphrase = () => {
    navigator.clipboard.writeText(passphrase);
    toast({
      title: "Passphrase copied!",
      status: "success",
      duration: 2000,
    });
  };

  const generateKey = () => {
    const seed = bip39.mnemonicToSeedSync(passphrase);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed).key;

    const keypair = Keypair.fromSecretKey(
      nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
    );

    setCurrentIndex(currentIndex + 1);

    return {
      publicKey: keypair.publicKey.toBase58(),
      secretKey: Buffer.from(keypair.secretKey).toString("hex"),
    };
  };

  const createWallet = () => {
    const { publicKey, secretKey } = generateKey();
    const newWallet = {
      id: Date.now(),
      name: `Wallet ${wallets.length + 1}`,
      publicKey,
      privateKey: secretKey,
      balance: 0,
    };
    setWallets([...wallets, newWallet]);
  };

  const togglePrivateKey = (id) => {
    setShowPrivateKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="#1A1A1A" p={8}>
        <VStack spacing={8} maxW="800px" mx="auto">
          {/* Secret Phrase Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            p={6}
            bg="#2A2A2A"
            borderRadius="xl"
            boxShadow="lg"
            w="100%"
          >
            <HStack justify="space-between" mb={4}>
              <Text fontSize="xl" fontWeight="bold">
                Your Secret Recovery Phrase
              </Text>
              <Button
                size="sm"
                variant="outline"
                colorScheme="gray"
                onClick={() => setShowPhrase((prev) => !prev)}
              >
                {showPhrase ? "Hide" : "Show"}
              </Button>
            </HStack>

            {showPhrase && (
              <>
                <Text
                  mb={4}
                  p={4}
                  bg="#333333"
                  borderRadius="md"
                  fontSize="sm"
                  wordBreak="break-word"
                >
                  {passphrase}
                </Text>
                <HStack>
                  <Button
                    leftIcon={<FaCopy />}
                    bg="#5B5F97"
                    color="white"
                    _hover={{ bg: "#6C63FF" }}
                    onClick={copyPassphrase}
                    as={motion.button}
                    whileHover={{ scale: 1.05 }}
                  >
                    Copy Passphrase
                  </Button>
                </HStack>
              </>
            )}
          </MotionBox>

          {/* Wallets Section */}
          <Box w="100%">
            <Button
              leftIcon={<FaPlus />}
              bg="#4CAF50"
              color="white"
              _hover={{ bg: "#45A049" }}
              mb={6}
              onClick={createWallet}
              as={motion.button}
              whileHover={{ scale: 1.05 }}
            >
              Create New Wallet
            </Button>

            <VStack spacing={4} w="100%">
              {wallets.map((wallet) => (
                <MotionBox
                  key={wallet.id}
                  w="100%"
                  p={6}
                  bg="#2A2A2A"
                  borderRadius="xl"
                  boxShadow="md"
                  whileHover={{ scale: 1.02 }}
                >
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="bold">{wallet.name}</Text>
                    <Text color="green.300">{wallet.balance} SOL</Text>
                  </HStack>

                  <Text fontSize="sm" mb={1} wordBreak="break-word">
                    Public Key: {wallet.publicKey}
                  </Text>

                  <HStack align="start">
                    <Box wordBreak="break-word" fontSize="sm" flex="1">
                      Private Key:{" "}
                      {showPrivateKey[wallet.id]
                        ? wallet.privateKey
                        : "••••••••••••"}
                    </Box>
                    <IconButton
                      icon={
                        showPrivateKey[wallet.id] ? <FaEyeSlash /> : <FaEye />
                      }
                      size="sm"
                      colorScheme="gray"
                      onClick={() => {
                        if (!showPrivateKey[wallet.id]) {
                          toast({
                            title: "Warning!",
                            description:
                              "Never share your private key with anyone.",
                            status: "warning",
                            duration: 5000,
                          });
                        }
                        togglePrivateKey(wallet.id);
                      }}
                    />
                  </HStack>
                </MotionBox>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;

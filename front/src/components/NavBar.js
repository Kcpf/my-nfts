import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';

import Identicon from './Identicon';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';


export default function NavBar({ address }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>My NFTs</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                href={'/'}>
                Dashboard
              </Link>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Link href={`https://etherscan.io/address/${address}`} isExternal>
              <Button
                colorScheme="blue"
                variant={'solid'}
                size={'sm'}
                mr={4}
              >
                {address}
              </Button>
            </Link>
            <Link href={'/my-tokens'}>
              <Button
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  icon={<Identicon account={address} />}
                />
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
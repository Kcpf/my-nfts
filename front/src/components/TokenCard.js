import {
  Box,
  Badge,
  Center,
  useColorModeValue,
  Heading,
  Button,
  Stack,
  Link,
  Image,
} from '@chakra-ui/react';
import axios from 'axios';
import { FcLike, FcDislike } from "react-icons/fc";
import { GoRocket } from "react-icons/go";

export default function TokenCard({ assetInfo, account, useFavorite = true }) {

  const bg = useColorModeValue('#151f21', 'gray.900');

  const addToServer = async () => {
    await axios.post("http://localhost:8000/nfts/", {
      "user_address": account,
      "asset_contract_address": assetInfo["asset_contract"]["address"],
      "token_id": assetInfo.token_id
    })
  }

  const removeFromServer = async () => {
    await axios.delete(`http://localhost:8000/nfts/${assetInfo["serverId"]}`)
  }

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${assetInfo.image_url})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={assetInfo.image_url}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          {assetInfo.is_presale && <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
            Pre-sale
          </Badge>}
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {assetInfo.name}
          </Heading>
        </Stack>
        {useFavorite ? <Button
          w={'full'}
          mt={8}
          bg={bg}
          color={'white'}
          rounded={'md'}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          onClick={addToServer}>
          Favorite <FcLike mx="2px" />
        </Button> : <Button
          w={'full'}
          mt={8}
          bg={bg}
          color={'white'}
          rounded={'md'}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          onClick={removeFromServer}>
          Un-favorite <FcDislike mx="2px" />
        </Button>}
        <Link href={assetInfo["permalink"]} isExternal>
          <Button
            w={'full'}
            mt={3}
            bg={'#3191e8'}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            onClick={addToServer}>
            More information <GoRocket mx="2px" />
          </Button>
        </Link >
      </Box>
    </Center>
  );
}
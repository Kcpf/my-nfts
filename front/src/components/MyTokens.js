import React, { useEffect, useState } from 'react';
import getWeb3 from "../getWeb3";
import {
  Container,
  Heading,
  Stack,
  Text,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import axios from 'axios';
import TokenCard from '../components/TokenCard';
import NavBar from './NavBar';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function MyTokens() {

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Get network provider and web3 instance.
        let tempWeb3 = await getWeb3();

        // Use web3 to get the user's accounts.
        let tempAccounts = await tempWeb3.eth.getAccounts();

        setWeb3(tempWeb3);
        setAccounts(tempAccounts);

        let assets = [];

        let responseServer = await axios.get(`${BASE_URL}/nfts/user/${tempAccounts[0]}`);

        for await (let asset of responseServer.data) {
          let response = await axios.get(`https://api.opensea.io/api/v1/asset/${asset["asset_contract_address"]}/${asset["token_id"]}/`)
          assets.push({ ...response.data, serverId: asset["id"] })
        }

        setAssets(assets);

      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    fetchData();
  }, [])

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <>
      <NavBar address={accounts[0]} />
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 19 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            My Tokens
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            Here you will find your favorite tokens that were saved
            previously
          </Text>
        </Stack>
      </Container>
      <Wrap spacing="30px" margin="1rem">
        {assets.map((asset) => (
          asset.image_url && <WrapItem key={asset.id}>
            <TokenCard assetInfo={asset} account={accounts[0]} useFavorite={false} />
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
}
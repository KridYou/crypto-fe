// pages/index.tsx
import { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Login from './login';

// Function to fetch the current Ethereum block number
const fetchEthereumBlockNumber = async () => {
  const response = await fetch('https://api.blockcypher.com/v1/eth/main');
  const data = await response.json();
  return data.height;
};

const Home = () => {
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const getBlockNumber = async () => {
      const block = await fetchEthereumBlockNumber();
      setBlockNumber(block);
    };

    getBlockNumber();

    // Update the block number every 30 seconds
    const interval = setInterval(() => getBlockNumber(), 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check authentication status on component mount
    const token = localStorage.getItem('authToken');
    setAuthenticated(!!token);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Welcome to Crypto Tracker</Typography>
      {!authenticated ? (
        <Login />
      ) : (
        <>
          <Typography variant="h6">Current Ethereum Block Number: {blockNumber ?? 'Loading...'}</Typography>
          <Link href="/portfolio" passHref>
            <Button variant="contained" color="primary" style={{ marginTop: 16 }}>
              Go to Portfolio
            </Button>
          </Link>
        </>
      )}
    </Container>
  );
};

export default Home;

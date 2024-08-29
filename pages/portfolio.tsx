import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Avatar, TextField, Box } from '@mui/material';
import axios from 'axios';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  logoUrl: string;
  priceInBTC: number;
  profitLoss: string;
}

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState<Crypto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Replace with your actual API endpoint and user ID
    axios.get('/api/portfolio/1')
      .then(response => {
        setPortfolioData(response.data);
      })
      .catch(error => {
        console.error('Error fetching portfolio data:', error);
      });
  }, []);

  const filteredData = portfolioData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Portfolio
      </Typography>

      <Box mb={4}>
        <TextField
          label="Search Cryptocurrencies"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
        gap={2}
      >
        {filteredData.map((crypto) => (
          <Box
            key={crypto.id}
            flexBasis="calc(33.333% - 16px)"
            flexGrow={1}
            mb={2}
          >
            <Card>
              <CardContent>
                <Avatar
                  alt={crypto.name}
                  src={crypto.logoUrl}
                  sx={{ width: 56, height: 56, marginBottom: 2 }}
                />
                <Typography variant="h6">{crypto.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {crypto.symbol}
                </Typography>
                <Typography variant="body1">Price in BTC: {crypto.priceInBTC ?? 'N/A'}</Typography>
                <Typography
                  variant="body1"
                  color={crypto.profitLoss.startsWith('+') ? 'green' : 'red'}
                >
                  Profit/Loss: {crypto.profitLoss ?? 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Portfolio;

import { useState, useContext } from 'react';
import { CulturalContext } from '../contexts/CulturalContext';
import { generateClient } from 'aws-amplify/api';

interface MarketingStrategyResponse {
  generateMarketingStrategy: {
    strategy: string;
    culturalContext: string;
    marketingChannels: string[];
  }
}

export const useCulturalMarketing = () => {
  const culturalContext = useContext(CulturalContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState('');

  const generateMarketingStrategy = async (input: any) => {
    setLoading(true);
    try {
      const client = generateClient();
      const response = await client.graphql<MarketingStrategyResponse>({
        query: /* GraphQL */ `
          mutation GenerateMarketingStrategy($input: MarketingInput!) {
            generateMarketingStrategy(input: $input) {
              strategy
              culturalContext
              marketingChannels
            }
          }
        `,
        variables: {
          input: {
            ...input,
            culturalContext: culturalContext
          }
        }
      });
      if ('data' in response) {
        setData(response.data.generateMarketingStrategy);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, generateMarketingStrategy };
}; 
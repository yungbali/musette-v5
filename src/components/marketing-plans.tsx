import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createCulturalPrompt } from '../lib/culturalPrompt';
import { MarketingPlansForm } from './marketing-plans-form';

interface MarketingPlanResponse {
  generateMarketingPlan: {
    plan: string;
    culturalContext: string;
  }
}

export function MarketingPlans() {
  const [state, setState] = useState({
    loading: false,
    error: '',
    data: '',
    step: 1
  });

  const [prompt, setPrompt] = useState({
    artist_name: '',
    genre: '',
    region: '',
    target_audience: '',
    budget: '',
    timeline: ''
  });

  const handlePromptChange = (field: string, value: string) => {
    setPrompt(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setState(s => ({ ...s, loading: true }));
    try {
      const client = generateClient();
      const response = await client.graphql<MarketingPlanResponse>({
        query: /* GraphQL */ `
          mutation GenerateMarketingPlan($input: MarketingInput!) {
            generateMarketingPlan(input: $input) {
              plan
              culturalContext
            }
          }
        `,
        variables: {
          input: {
            ...prompt,
            systemPrompt: createCulturalPrompt('marketing', prompt)
          }
        }
      });
      
      if ('data' in response) {
        setState(s => ({ ...s, data: response.data.generateMarketingPlan.plan }));
      }
    } catch (err) {
      setState(s => ({ ...s, error: err instanceof Error ? err.message : 'Error' }));
    } finally {
      setState(s => ({ ...s, loading: false }));
    }
  };

  return <MarketingPlansForm {...state} prompt={prompt} onSubmit={handleSubmit} onPromptChange={handlePromptChange} />;
}

import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createCulturalPrompt } from '../lib/culturalPrompt';
import { MarketingPlansForm } from './marketing-plans-form';
import MarkDownDisplay from './react-markdown';

interface MarketingPlanResponse {
  generateMarketingPlan: {
    plan: string;
    culturalContext: string;
  }
}

const useMarketingPlans = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [prompt, setPrompt] = useState({
    genre: '',
    region: '',
    budget: '',
  });

  const handlePromptChange = (field: string, value: string) => {
    setPrompt(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

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
        setData(response.data.generateMarketingPlan.plan);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    prompt,
    handlePromptChange,
    handleSubmit
  };
};

export function MarketingPlans() {
  const { loading, error, data, prompt, handlePromptChange, handleSubmit } = useMarketingPlans();

  return (
    <>
      <MarketingPlansForm
        loading={loading}
        prompt={prompt}
        onPromptChange={handlePromptChange}
        onSubmit={handleSubmit}
      />
      <MarkDownDisplay 
        text={data} 
        title="Marketing Plan" 
        btnText="Download Plan"
        loading={loading}
        error={error}
      />
    </>
  );
}

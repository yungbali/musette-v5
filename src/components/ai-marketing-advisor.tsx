import { generateClient } from 'aws-amplify/api';
import { useState, useContext } from 'react'
import { Button } from "./ui/button"
import AiMarketingAdvisorForm from './ai-marketing-advisor-form'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import MarkDownDisplay from './react-markdown'
import { CulturalContext } from '../contexts/CulturalContext'

interface PropsData {
  data: string;
  error: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSlectInputChange: (value: string) => void;
  handleSubmit: () => Promise<void>;
  loading: boolean;
  prompt: {
    band_name: string;
    genre: string;
    target_audience: string;
    current_followers: string;
    streams: string;
    budget: string;
    advice: string;
    cultural_elements: string;
    diaspora_focus: string;
  }
}

function AlertDialogDemo({ loading, data, error, handleSlectInputChange, handleInputChange, handleSubmit, prompt }: PropsData) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center justify-end" asChild>
        <div className='flex items-center justify-end'>
          <Button variant="outline" onClick={() => {

          }}>Generate New Market Plan</Button>
        </div>
      </AlertDialogTrigger>
      {<AlertDialogContent>
        <AiMarketingAdvisorForm
          handleSubmit={handleSubmit}
          prompt={prompt}
          data={data}
          error={error}
          loading={loading}
          handleInputChange={handleInputChange}
          handleSlectInputChange={(value) => handleSlectInputChange(value)}
        />
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogContent>}
    </AlertDialog>
  )
}

const generateMarketingAdvice = /* GraphQL */ `
  mutation GenerateMarketingAdvice($input: MarketingInput!) {
    generateMarketingAdvice(input: $input)
  }
`;

const useAiMarketingAdvisor = () => {
  const culturalContext = useContext(CulturalContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [prompt, setPrompt] = useState({
    band_name: '',
    genre: '',
    target_audience: '',
    current_followers: '',
    streams: '',
    budget: '',
    advice: '',
    cultural_elements: culturalContext?.musicTraditions.join(', ') || '',
    diaspora_focus: culturalContext?.diasporaConnections.join(', ') || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSlectInputChange = (value: string) => {
    setPrompt(prev => ({ ...prev, target_audience: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const client = generateClient();
      const response = await client.graphql({
        query: generateMarketingAdvice,
        variables: {
          input: {
            ...prompt,
            cultural_context: JSON.stringify(culturalContext)
          }
        }
      });

      if ('data' in response) {
        setData(response.data.generateMarketingAdvice);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, prompt, handleSubmit, handleInputChange, handleSlectInputChange };
};

export function AIMarketingAdvisor() {
  const { data, prompt, error, handleInputChange, handleSlectInputChange, handleSubmit, loading } = useAiMarketingAdvisor();

  const uiToShow = data ? 1 : 0;
  if (uiToShow === 0) {
    return (
      <AiMarketingAdvisorForm
        handleSubmit={handleSubmit}
        prompt={prompt}
        data={data}
        error={error}
        loading={loading}
        handleInputChange={handleInputChange}
        handleSlectInputChange={(value) => handleSlectInputChange(value)}
      />
    );
  }

  return (
    <>
      <AlertDialogDemo
        handleSlectInputChange={(value) => handleSlectInputChange(value)}
        prompt={prompt}
        data={data}
        error={error}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <MarkDownDisplay
        text={data}
        title='Generate Marketing Advice'
        btnText='Download Advice'
        key={data}
      />
    </>
  );

}
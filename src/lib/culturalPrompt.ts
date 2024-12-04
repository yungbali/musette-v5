import { africanGenres, africanRegions } from '../constants/cultural-data';

type PromptType = 'marketing' | 'epk' | 'advisor';

export const createCulturalPrompt = (type: PromptType, data: any) => {
  const basePrompt = {
    genre: africanGenres.find(g => g.value === data.genre)?.label,
    region: africanRegions.find(r => r.value === data.region)?.label,
    audience: data.target_audience,
  };

  const prompts = {
    marketing: `Create a marketing strategy for ${data.artist_name}, 
    a ${basePrompt.genre} artist from ${basePrompt.region},
    targeting ${basePrompt.audience}`,
    
    epk: `Generate an EPK for ${data.artist_name}, 
    highlighting their ${basePrompt.genre} roots from ${basePrompt.region}`,
    
    advisor: `Provide marketing advice for ${data.artist_name},
    considering their ${basePrompt.genre} style and ${basePrompt.region} heritage`
  };

  return prompts[type];
}; 
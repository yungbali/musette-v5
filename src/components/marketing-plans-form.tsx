import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { africanGenres, africanRegions } from '../constants/cultural-data';
import { Label } from "./ui/label"

interface MarketingFormProps {
  loading: boolean;
  prompt: {
    genre: string;
    region: string;
    budget: string;
  };
  onPromptChange: (field: string, value: string) => void;
  onSubmit: () => void;
}

export function MarketingPlansForm({ loading, prompt, onPromptChange, onSubmit }: MarketingFormProps) {
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div>
        <Label>Genre</Label>
        <Select value={prompt.genre} onValueChange={value => onPromptChange('genre', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            {africanGenres.map(genre => (
              <SelectItem key={genre.value} value={genre.value}>
                {genre.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Region</Label>
        <Select value={prompt.region} onValueChange={value => onPromptChange('region', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {africanRegions.map(region => (
              <SelectItem key={region.value} value={region.value}>{region.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Budget (USD)</Label>
        <Input
          type="number"
          value={prompt.budget}
          onChange={e => onPromptChange('budget', e.target.value)}
        />
      </div>

      <Button 
        onClick={onSubmit} 
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Plan'}
      </Button>
    </div>
  );
}
import { createContext } from 'react';

export interface CulturalContextType {
  musicTraditions: string[];
  diasporaConnections: string[];
}

export const CulturalContext = createContext<CulturalContextType | null>(null);

export const defaultCulturalContext: CulturalContextType = {
  musicTraditions: ['Highlife', 'Afrobeat', 'Soukous', 'Palm-wine'],
  diasporaConnections: ['West African', 'East African', 'Southern African']
}; 
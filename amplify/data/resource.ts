import { a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  albumArtGenerator: a.generation({
    aiModel: a.ai.model('stability.stable-diffusion-xl-v1'),
    systemPrompt: `You are an expert album artwork generator. 
    Create visually striking and meaningful album covers based on the provided details.
    Always ensure the artwork is appropriate and relevant to the music genre and mood.`,
  })
  .arguments({
    albumTitle: a.string(),
    artistName: a.string(),
    genre: a.string(),
    mood: a.string(),
    style: a.string(),
    colorScheme: a.string(),
    additionalNotes: a.string(),
  })
  .returns(a.string())
  .authorization((allow) => allow.authenticated()),
});

export default defineData({ schema });

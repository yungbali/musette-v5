import { a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  marketingAdvisor: a.generation({
    aiModel: a.ai.model('Claude 3.5 Sonnet'),
    systemPrompt: `You are an expert music marketing advisor with deep knowledge of the music industry, digital marketing, and audience engagement strategies. 
    Analyze the provided information and create detailed, actionable marketing plans that are:
    1. Data-driven and specific to the artist's genre and audience
    2. Budget-conscious and realistic to implement
    3. Focused on growth and engagement metrics
    4. Organized with clear steps and timelines
    Always provide specific, actionable advice with examples and estimated costs.`,
  })
  .arguments({
    band_name: a.string(),
    genre: a.string(),
    target_audience: a.string(),
    current_followers: a.string(),
    streams: a.string(),
    budget: a.string(),
    goals: a.string()
  })
  .returns(a.string())
  .authorization((allow) => allow.authenticated()),

  epkGenerator: a.generation({
    aiModel: a.ai.model('Claude 3.5 Sonnet'),
    systemPrompt: `You are an expert EPK (Electronic Press Kit) creator for musicians.
    Create professional, compelling EPKs that include:
    1. Artist biography
    2. Press highlights
    3. Performance history
    4. Media coverage
    Always maintain a professional tone and highlight unique selling points.`,
  })
  .arguments({
    artist_name: a.string(),
    genre: a.string(),
    career_highlights: a.string(),
    discography: a.string(),
    press_mentions: a.string(),
    social_media: a.string()
  })
  .returns(a.string())
  .authorization((allow) => allow.authenticated()),
});

export default defineData({ schema });

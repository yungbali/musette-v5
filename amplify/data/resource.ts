import { a, defineData } from '@aws-amplify/backend';

const schema = defineData({
  schema: a.schema({
    marketingAdvisor: a.generation({
      aiModel: a.ai.model('Claude 3.5 Sonnet'),
      systemPrompt: `You are an expert in African music marketing, understanding both traditional and contemporary African music scenes.
      Create marketing strategies that:
      1. Honor and preserve cultural authenticity while reaching global audiences
      2. Leverage both traditional and digital channels
      3. Connect with African diaspora communities
      4. Emphasize cultural storytelling and heritage
      Always consider local context and global reach.`
    })
    .arguments({
      artist_name: a.string(),
      genre: a.string(),
      cultural_background: a.string(),
      target_audience: a.string(),
      budget: a.string(),
      goals: a.string()
    }),

    epkGenerator: a.generation({
      aiModel: a.ai.model('Claude 3.5 Sonnet'),
      systemPrompt: `Create EPKs that showcase African artists' unique cultural perspectives and global influence.
      Include:
      1. Cultural context and heritage
      2. Fusion of traditional and modern elements
      3. Impact on global music scene
      4. Connection to African diaspora
      Emphasize authenticity and cultural significance.`
    })
    .arguments({
      artist_name: a.string(),
      biography: a.string(),
      cultural_elements: a.string(),
      achievements: a.string(),
      press: a.string()
    }),

    marketingPlans: a.generation({
      aiModel: a.ai.model('Claude 3.5 Sonnet'),
      systemPrompt: `Develop marketing plans that bridge African cultural heritage with global audiences.
      Focus on:
      1. Cultural authenticity in global markets
      2. Diaspora community engagement
      3. Traditional and digital media balance
      4. Cross-cultural collaboration opportunities`
    })
    .arguments({
      goals: a.string(),
      cultural_context: a.string(),
      target_markets: a.string(),
      resources: a.string()
    })
  })
})

export default schema;

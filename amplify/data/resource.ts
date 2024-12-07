import { a, defineData } from '@aws-amplify/backend';

const schema = defineData({
  schema: a.schema({
    User: a.model({
      id: a.id(),
      email: a.string()
    }).authorization(auth => [
      auth.publicApiKey(),
      auth.authenticated()
    ]),

    MarketingAdvisor: a.query()
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
      .authorization(auth => [
        auth.publicApiKey(),
        auth.authenticated()
      ])
  })
});
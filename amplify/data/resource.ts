import { a, defineData } from '@aws-amplify/backend';

const schema = defineData({
  schema: a.schema({
    MarketingPlan: a.model({
      id: a.id(),
      content: a.string(),
      genre: a.string(),
      region: a.string(),
      budget: a.string(),
    }),

    generatePlan: a.mutation()
      .arguments({
        genre: a.string(),
        region: a.string(),
        budget: a.string()
      })
      .returns(a.string())
  })
});

export default schema;

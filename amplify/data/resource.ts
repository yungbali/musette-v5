import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = defineData({
  schema: a.schema({
    User: a.model({
      id: a.id(),
      email: a.string(),
    })
  })
});

export default schema; 
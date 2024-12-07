import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = defineData({
  schema: a.schema({
    User: a.model({
      id: a.id(),
      email: a.string(),
    }).authorization(auth => [
      auth.authenticated()
    ])
  })
});

export default schema;
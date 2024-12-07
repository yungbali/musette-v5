import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  // your auth configuration here
  loginWith: {
    email: true,
    // add other authentication options as needed
  }
});

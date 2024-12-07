import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import schema from './data/resource';

const backend = defineBackend({
  auth,
  data: schema
}); 
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth';

const backend = defineBackend({
  auth: auth
}); 
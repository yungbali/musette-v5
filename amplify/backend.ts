import { defineBackend } from '@aws-amplify/backend';
import { defineAuth } from '@aws-amplify/backend';
import { auth } from './auth';

const backend = defineBackend({
  auth: auth
}); 
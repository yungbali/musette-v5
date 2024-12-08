const fs = require('fs');
const path = require('path');

const environment = process.argv[2] || 'dev';

const envConfigs = {
  dev: {
    VITE_API_URL: 'https://dev-api.musette.com',
    VITE_AUTH_REGION: 'us-east-1',
    VITE_USER_POOL_ID: 'us-east-1_xxxxx',
    VITE_USER_POOL_CLIENT_ID: 'dev-client-id'
  },
  staging: {
    VITE_API_URL: 'https://staging-api.musette.com',
    VITE_AUTH_REGION: 'us-east-1',
    VITE_USER_POOL_ID: 'us-east-1_yyyyy',
    VITE_USER_POOL_CLIENT_ID: 'staging-client-id'
  },
  prod: {
    VITE_API_URL: 'https://api.musette.com',
    VITE_AUTH_REGION: 'us-east-1',
    VITE_USER_POOL_ID: 'us-east-1_zzzzz',
    VITE_USER_POOL_CLIENT_ID: 'prod-client-id'
  }
};

const config = envConfigs[environment];
const envContent = Object.entries(config)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

fs.writeFileSync(path.join(process.cwd(), '.env'), envContent);
console.log(`Environment set to ${environment}`); 
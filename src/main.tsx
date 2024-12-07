import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { amplifyconfiguration } from './amplifyconfiguration';

Amplify.configure({
  Auth: {
    Cognito: amplifyconfiguration.Auth.Cognito
  },
  API: {
    GraphQL: {
      ...amplifyconfiguration.API.GraphQL,
      defaultAuthMode: "apiKey" // Set explicit GraphQLAuthMode
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

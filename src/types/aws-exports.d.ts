declare module 'aws-exports' {
  const config: {
    Auth: {
      region: string;
      userPoolId: string;
      userPoolWebClientId: string;
      identityPoolId: string;
      mandatorySignIn: boolean;
      authenticationFlowType: string;
      oauth: {
        domain: string;
        scope: string[];
        redirectSignIn: string;
        redirectSignOut: string;
        responseType: string;
      };
    };
  };
  export default config;
} 
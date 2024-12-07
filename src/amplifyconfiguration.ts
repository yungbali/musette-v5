import { type ResourcesConfig } from 'aws-amplify';

export const amplifyconfiguration: ResourcesConfig = {
    Auth: {
        Cognito: {
            userPoolId: 'us-east-1_0VHjGRrFS',
            userPoolClientId: '10u983fvgbegh7igugh6rla099',
            signUpVerificationMethod: 'code'
        }
    }
}; 
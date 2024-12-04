const awsconfig = {
    aws_project_region: 'us-east-1',
    aws_cognito_region: 'us-east-1',
    aws_user_pools_id: 'us-east-1_0VHjGRrFS',
    aws_user_pools_web_client_id: '10u983fvgbegh7igugh6rla099',
    oauth: {
        domain: 'your-domain.auth.us-east-1.amazoncognito.com',
        scope: ['email', 'openid'],
        redirectSignIn: 'http://localhost:5173/',
        redirectSignOut: 'http://localhost:5173/',
        responseType: 'code'
    }
};

export default awsconfig; 
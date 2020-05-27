import Amplify from '@aws-amplify/core';
import Storage from '@aws-amplify/storage';
export function configureAmplify() {
  Amplify.configure({
    Auth: {
      identityPoolId: 'us-east-1:6eab7b04-7989-492a-92a1-fd9c82c90cbe',
      region: 'us-east-1',
      userPoolId: 'us-east-1_6vp26Qrpb',
      userPoolWebClientId: 'rctmgqu0jhl6ievcsg5qfv0h6',
      roleArn: 'arn:aws:iam::160631031376:role/Cognito_merchexpresAuth_Role',
      accountId: '160631031376',
    },
    Storage: {
      bucket: 'merchexpres',
      region: 'us-east-1',
      identityPoolId: 'us-east-1:6eab7b04-7989-492a-92a1-fd9c82c90cbe',
    },
  });
  console.log(Amplify);
}
export function SetS3Config(bucket, level) {
  Storage.configure({
    bucket: bucket,
    level: level,
    region: 'us-east-1',
    identityPoolId: 'us-east-1:6eab7b04-7989-492a-92a1-fd9c82c90cbe',
  });
}

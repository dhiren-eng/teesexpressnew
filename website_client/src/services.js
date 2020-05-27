import Amplify from '@aws-amplify/core';
import Storage from '@aws-amplify/storage';
import { Auth } from 'aws-amplify';
export function configureAmplify() {
  Amplify.configure({
    Auth: {
      identityPoolId: 'us-east-1:6eab7b04-7989-492a-92a1-fd9c82c90cbe',
      region: 'us-east-1',
      userPoolId: 'us-east-1_6vp26Qrpb',
      userPoolWebClientId: 'rctmgqu0jhl6ievcsg5qfv0h6',
    },
    Storage: {
      bucket: 'merchexpres',
      region: 'us-east-1',
      identityPoolId: 'us-east-1:6eab7b04-7989-492a-92a1-fd9c82c90cbe',
    },
  });
}
const currentConfig = Auth.configure();
console.log(currentConfig);
export function SetS3Config(bucket, level) {
  Storage.configure({
    bucket: bucket,
    level: level,
    region: 'us-east-1',
    identityPoolId: 'us-east-1:6eab7b04-7989-492a-92a1-fd9c82c90cbe',
  });
}

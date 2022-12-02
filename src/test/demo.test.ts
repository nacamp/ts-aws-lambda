import '.';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

test('demo', async () => {
  const client = new LambdaClient({
    region: process.env.AWS_S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || '',
    },
  });
  const params: any = {
    d1: { localPath: '/tmp/1.txt', key: 'test/1.txt' },
    u1: { localPath: '/tmp/2.txt', key: 'test/2.txt' },
    d2: { localPath: '/tmp/3.txt', key: 'test/2.txt' },
  };
  const command = new InvokeCommand({ FunctionName: 'toy-ts-dev-demo', Payload: Buffer.from(JSON.stringify(params)) });
  const data = await client.send(command);
  //console.log(data)
  //expect( JSON.parse(Buffer.from(data.Payload).toString()).result).toBe("122");
  expect(JSON.parse(Buffer.from(data.Payload).toString()).result).toBe('12');
});
// https://github.com/aws/aws-sdk-js-v3/issues/2252

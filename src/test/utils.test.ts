import '.';
import { uploadToS3, downloadFromS3 } from '../utils';

test('public', async () => {
  await uploadToS3(`${__dirname}/seed/test1.png`, 'test/test1.png');
  await downloadFromS3('/tmp/public.png', 'test/test1.png');
});

test('private', async () => {
  await uploadToS3(`${__dirname}/seed/test1.png`, 'test/test1.png', true);
  await downloadFromS3('/tmp/private.png', 'test/test1.png', true);
});

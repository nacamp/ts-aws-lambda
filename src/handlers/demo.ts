import { readFileSync, writeFileSync } from 'fs';
import { uploadToS3, downloadFromS3 } from '../utils';

interface IEvent {
  d1: {
    localPath: string;
    key: string;
  };
  u1: {
    localPath: string;
    key: string;
  };
  d2: {
    localPath: string;
    key: string;
  };
}

async function aws({ d1, u1, d2 }: IEvent) {
  await downloadFromS3(d1.localPath, d1.key, true);
  let data = readFileSync(d1.localPath, 'utf8');
  writeFileSync(u1.localPath, data + '2');
  await uploadToS3(u1.localPath, u1.key, true);
  await downloadFromS3(d2.localPath, d2.key, true);
  data = readFileSync(d2.localPath, 'utf8');
  return data;
}

export default async function handler(event: IEvent) {
  return {
    result: await aws(event),
  };
}

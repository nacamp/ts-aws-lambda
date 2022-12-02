require('dotenv').config();
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as mime from 'mime-types';

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || '',
  },
});

const downloadFromS3 = async (localFilePath: string, s3FilePath: string, isPrivate: boolean = false) => {
  const params = {
    Key: s3FilePath,
    // ACL: 'public-read',
    Bucket: isPrivate ? process.env.AWS_S3_PRIVATE_BUCKET : process.env.AWS_S3_BUCKET,
  };
  const data: any = await s3Client.send(new GetObjectCommand(params));
  return new Promise((resolve, reject) => {
    data?.Body?.pipe(fs.createWriteStream(localFilePath))
      .on('error', (err) => reject(err))
      .on('close', () => resolve(true));
  });
};

const uploadToS3 = async (localFilePath: string, s3FilePath: string, isPrivate: boolean = false) => {
  const fileType = mime?.lookup(localFilePath) || 'application/octet-stream';
  const params = {
    Body: fs.createReadStream(localFilePath),
    ContentType: fileType,
    Key: s3FilePath,
    // ACL: 'private',
    Bucket: isPrivate ? process.env.AWS_S3_PRIVATE_BUCKET : process.env.AWS_S3_BUCKET,
  };
  return s3Client.send(new PutObjectCommand(params));
};

export { downloadFromS3, uploadToS3 };

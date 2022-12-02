import * as cfg from '../../config.dev';
// console.log('cfg', cfg)
const CONFIG = cfg.CONFIG();
// console.log(CONFIG)
// console.log(CONFIG.aws)
// console.log(CONFIG.aws.region)
process.env.AWS_S3_REGION = CONFIG.aws.region;
process.env.AWS_S3_ACCESS_KEY_ID = CONFIG.aws.accessKeyId;
process.env.AWS_S3_SECRET_ACCESS_KEY = CONFIG.aws.secretAccessKey;
process.env.AWS_S3_BUCKET = CONFIG.aws.s3.bucket;
process.env.AWS_S3_UPLOADROOT = CONFIG.aws.s3.uploadRoot;
process.env.AWS_S3_PRIVATE_BUCKET = CONFIG.aws.s3_private.bucket;
process.env.AWS_S3_URL = CONFIG.aws.s3.url;
process.env.SEED = CONFIG.testSeed;
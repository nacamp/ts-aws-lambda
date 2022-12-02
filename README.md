# lambda
- handler.ts 에 람다 등록

## test
- serverless invoke --function demo --path  data.json
- serverless invoke local --function demo --path  data.json
# layer
- src/layer/nodejs 밑에서 yarn install 먼저 실행 
- sls deploy

# etc

## servlerless
```
-plugin
serverless-esbuild
https://www.serverless.com/plugins/serverless-esbuild
https://github.com/evanw/esbuild

serverless-plugin-typescript
https://www.serverless.com/plugins/serverless-plugin-typescript
```

## typescript
- https://www.serverless.com/examples/aws-node-typescript
- https://github.com/serverless/examples/
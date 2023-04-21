import { StackContext, Api, Config } from 'sst/constructs';

export function API({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        bind: [
          new Config.Secret(stack, 'DB_HOST'), // pnpx sst secrets set DB_HOST {your_db_host}
          new Config.Secret(stack, 'DB_PASS'), // pnpx sst secrets set DB_PASS {your_db_pass}
          new Config.Parameter(stack, 'DB_PORT', {
            value: '5432',
          }),
          new Config.Parameter(stack, 'DB_USER', {
            value: 'your-db-username',
          }),
          new Config.Parameter(stack, 'DB_NAME', {
            value: 'neondb',
          }),
        ],
        environment: {
          STAGE: stack.stage,
        },
        copyFiles: [
          {
            from: 'packages/core/migrations',
            to: 'migrations',
          },
        ],
      },
    },
    routes: {
      'GET /': 'packages/functions/src/lambda.handler',
      'GET /migrate': 'packages/functions/src/migrator.handler',
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}

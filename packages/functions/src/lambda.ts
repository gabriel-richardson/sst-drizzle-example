import { ApiHandler } from 'sst/node/api';
import { SQL } from '@sst-drizzle-example/core/sql/index';
import { users } from '@sst-drizzle-example/core/sql/schema';

export const handler = ApiHandler(async (_evt) => {
  const response = await SQL.DB.select().from(users);
  return {
    body: JSON.stringify(response, null, 2),
  };
});

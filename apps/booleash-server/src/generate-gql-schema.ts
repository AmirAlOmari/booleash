import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { AppResolver } from './app/app.resolver';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const resolvers: Function[] = [AppResolver];

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const scalars: Function[] = [];

async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create(resolvers, scalars);

  await writeFile(
    join(process.cwd(), 'apps/booleash-server/src/assets/schema.gql'),
    printSchema(schema)
  );
}

generateSchema().catch(console.error);

import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { format } from 'prettier';
import { FeatureToggleResolver } from './app/feature-toggle/feature-toggle.resolver';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const resolvers: Function[] = [FeatureToggleResolver];

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const scalars: Function[] = [];

async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create(resolvers, scalars);
  const formattedSchema = await format(printSchema(schema));

  await writeFile(
    join(process.cwd(), 'apps/tablit-server/schema.gql'),
    formattedSchema,
  );
}

generateSchema().catch(console.error);

import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../../../apps/booleash-server/src/assets/schema.gql',
  documents: './src/**/*.gql',
  generates: {
    './src/lib/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
    },
  },
};

export default config;

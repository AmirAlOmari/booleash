import type { CodegenConfig } from '@graphql-codegen/cli';

const FILE_PATH = './src/lib/generated.ts';
const NOOP_IMPORT_PATH = 'noop';

const config: CodegenConfig = {
  schema: '../../../apps/booleash-server/schema.gql',
  documents: './src/**/*.gql',
  generates: {
    [FILE_PATH]: {
      plugins: [
        'typescript',
        'typescript-operations',
        'typed-document-node',
        {
          'typescript-apollo-angular': {
            documentMode: 'external',
            importDocumentNodeExternallyFrom: NOOP_IMPORT_PATH,
          },
        },
      ],
    },
  },
};

export default config;

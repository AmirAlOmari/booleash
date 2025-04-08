import type { CodegenConfig } from '@graphql-codegen/cli';
import { join } from 'node:path';

const FILE_PATH = './src/lib/generated.ts';
const NOOP_IMPORT_PATH = 'noop';

const config: CodegenConfig = {
  schema: '../../../apps/tablit-server/schema.gql',
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
      hooks: {
        beforeOneFileWrite: (filename, code) => {
          if (filename !== join(__dirname, FILE_PATH)) {
            return code;
          }

          return code.replace(
            `import * as Operations from '${NOOP_IMPORT_PATH}';\n`,
            ''
          );
        },
      },
    },
  },
};

export default config;

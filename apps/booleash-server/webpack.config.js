const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/booleash-server'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      additionalEntryPoints: [
        {
          entryName: 'generate-gql-schema',
          entryPath: './src/generate-gql-schema.ts',
        },
      ],
      transformers: [
        {
          name: '@nestjs/graphql/plugin',
          options: {},
        },
      ],
    }),
  ],
};
